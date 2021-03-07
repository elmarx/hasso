import { ha } from "./index";
import { HassEvent } from "../src";

ha()
  .getWebsocket()
  .then((websocket) => websocket.on(HassEvent.TAG_SCANNED, console.log))
  .catch(console.error);
