import { RawState, RawStateChanged } from "../model/raw";
import { HassEvent, State, StateChangedEvent } from "../model";

export function reviveState(s: RawState): State {
  return {
    ...s,
    last_changed: new Date(s.last_changed),
    last_updated: new Date(s.last_updated),
  };
}

export function reviveStateChanged(s: RawStateChanged): StateChangedEvent {
  const oldState = s.data.old_state ? reviveState(s.data.old_state) : null;
  const newState = s.data.new_state ? reviveState(s.data.new_state) : null;

  return {
    ...s,
    data: {
      ...s.data,
      old_state: oldState,
      new_state: newState,
    },
    time_fired: new Date(s.time_fired),
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
    case HassEvent.STATE_CHANGED:
      return reviveStateChanged(event as any);
    default:
      return reviveTimeFired(event);
  }
}
