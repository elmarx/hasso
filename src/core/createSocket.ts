import WebSocket from "ws";
import { HaWebSocket } from "home-assistant-js-websocket";
import { defer } from "../utils/deferred";

const MSG_TYPE_AUTH_REQUIRED = "auth_required";
const MSG_TYPE_AUTH_INVALID = "auth_invalid";
const MSG_TYPE_AUTH_OK = "auth_ok";

function authenticate(socket: WebSocket, accessToken: string) {
  return () => {
    try {
      socket.send(JSON.stringify({ type: "auth", access_token: accessToken }));
    } catch (e) {
      socket.close();
    }
  };
}

function handleAuth(socket: WebSocket, open: () => void, done: () => void) {
  function handleMessage(event: {
    data: any;
    type: string;
    target: WebSocket;
  }) {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case MSG_TYPE_AUTH_INVALID:
        socket.close();
        break;

      case MSG_TYPE_AUTH_OK:
        socket.removeEventListener("open", open);
        socket.removeEventListener("message", handleMessage);
        done();
        break;

      default:
        // We already send this message when socket opens
        if (message.type !== MSG_TYPE_AUTH_REQUIRED) {
          console.error("[Auth phase] Unhandled message", message);
        }
    }
  }

  return handleMessage;
}

export function createSocket(
  version: string,
  socketUrl: string,
  token: string
) {
  return async (): Promise<HaWebSocket> => {
    const ws = new WebSocket(socketUrl);

    const deferred = defer<void>();

    const open = authenticate(ws, token);
    ws.addEventListener("open", open);
    ws.addEventListener("message", handleAuth(ws, open, deferred.resolve));

    await deferred.promise;

    // patch the version onto the WebSocket object, so it becomes a HaWebSocket object
    (ws as any).version = version;
    return ws as any;
  };
}
