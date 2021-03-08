import { State } from "../state";
import { Context } from "../context";
import { HassEvent } from "./events";

export type StateChangedEvent = {
  event_type: HassEvent.STATE_CHANGED;
  data: {
    entity_id: string;
    old_state: State | null;
    new_state: State | null;
  };
  origin: string;
  time_fired: Date;
  context: Context;
};
