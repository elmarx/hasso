import { State } from "./model.api";
import { StateChangedEvent, TagScannedEvent } from "./model.events";

export type RawState = Omit<State, "last_changed" | "last_updated"> & {
  last_changed: string;
  last_updated: string;
};

type Fired = { time_fired: Date };
export type RawEvent<T extends Fired> = Omit<T, "time_fired"> & {
  time_fired: string;
};

export type RawTagScannedEvent = RawEvent<TagScannedEvent>;
export type RawStateChangedEvent = Omit<RawEvent<StateChangedEvent>, "data"> & {
  entity_id: string;
  old_state: RawState;
  new_state: RawState;
};
