import { ha } from "./index";
import { Event } from "../src";
import { diffString } from "json-diff";

const entityId = "sun.sun";
const api = ha();

api
  .state(entityId)
  .then((v) => console.log("initial value:", v))
  .catch(console.error);
api.getWebsocket().then((ws) =>
  ws.on(Event.STATE_CHANGED, (event) => {
    if (event.data.entity_id === entityId) {
      const diff = diffString(event.data.old_state, event.data.new_state);
      console.log("state change:", diff);
    }
  })
);
