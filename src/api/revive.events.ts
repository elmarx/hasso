import { Event } from "./model.events";

export function reviveTimeFired<T extends { time_fired: string }>(
  e: T,
): Omit<T, "time_fired"> & {
  time_fired: Date;
} {
  return {
    ...e,
    time_fired: new Date(e.time_fired),
  };
}

export function reviveEvent<T extends { time_fired: string }>(
  eventName: Event,
  event: T,
) {
  switch (eventName) {
    default:
      return reviveTimeFired(event);
  }
}
