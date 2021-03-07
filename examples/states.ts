import { ha } from "./index";
import { HassEvent } from "../src";

ha()
  .getWebsocket()
  .then((websocket) => websocket.on(HassEvent.STATE_CHANGED, console.log))
  .catch(console.error);
