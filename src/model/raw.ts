import { State } from "./state";

export type RawState = Omit<State, "last_changed" | "last_updated"> & {
  last_changed: string;
  last_updated: string;
};

type Fired = { time_fired: Date };
export type RawEvent<T extends Fired> = Omit<T, "time_fired"> & {
  time_fired: string;
};
