import { ha } from "./index";
import { HassEvent, KnownEntities, reviveSunState } from "../src";
import { diffString } from "json-diff";
import { isError } from "ts-try";

const entityId = KnownEntities.Sun;
const api = ha();

api
  .state(entityId)
  .then((v) => {
    if (isError(v)) {
      console.error(v);
    } else {
      console.log("initial value", reviveSunState(v));
    }
  })
  .catch(console.error);
api.getWebsocket().then((ws) =>
  ws.on(HassEvent.STATE_CHANGED, (event) => {
    if (event.data.entity_id === entityId) {
      const diff = diffString(event.data.old_state, event.data.new_state);
      console.log("state change:", diff);
    }
  })
);
