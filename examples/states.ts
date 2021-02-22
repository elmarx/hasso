import { ha } from "./index";
import { Event } from "../src";

ha()
  .getWebsocket()
  .then((websocket) => websocket.on(Event.STATE_CHANGED, console.log))
  .catch(console.error);
