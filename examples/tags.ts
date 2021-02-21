import { ha } from "./index";
import { Event } from "../src";

ha()
  .getWebsocket()
  .then((websocket) => websocket.on(Event.TAG_SCANNED, console.log))
  .catch(console.error);
