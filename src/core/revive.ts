import { RawState } from "../model/raw";
import { HassEvent, State } from "../model";

export function reviveStateState(s: RawState): State {
  return {
    ...s,
    last_changed: new Date(s.last_changed),
    last_updated: new Date(s.last_updated),
  };
}

export function reviveTimeFired<T extends { time_fired: string }>(
  e: T
): Omit<T, "time_fired"> & {
  time_fired: Date;
} {
  return {
    ...e,
    time_fired: new Date(e.time_fired),
  };
}

export function reviveEvent<T extends { time_fired: string }>(
  eventName: HassEvent,
  event: T
) {
  switch (eventName) {
    default:
      return reviveTimeFired(event);
  }
}
