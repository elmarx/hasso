import { State } from "./state";
import { StateChangedEvent } from "./websocket";

export type RawState = Omit<State, "last_changed" | "last_updated"> & {
  last_changed: string;
  last_updated: string;
};

export type RawStateChanged = Omit<StateChangedEvent, "data" | "time_fired"> & {
  data: {
    entity_id: string;
    old_state: RawState | null;
    new_state: RawState | null;
  };
  time_fired: string;
};

type Fired = { time_fired: Date };
export type RawEvent<T extends Fired> = Omit<T, "time_fired"> & {
  time_fired: string;
};
