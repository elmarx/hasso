import { RawState } from "./model.raw";
import { State } from "./model.api";

export function reviveState(s: RawState): State {
  return {
    ...s,
    last_changed: new Date(s.last_changed),
    last_updated: new Date(s.last_updated),
  };
}
