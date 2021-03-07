import { State } from "../model";

export type Sun = Omit<State, "attributes"> & {
  state: "above_horizon" | "below_horizon";
  attributes: {
    next_dawn: Date;
    next_dusk: Date;
    next_midnight: Date;
    next_noon: Date;
    next_rising: Date;
    next_setting: Date;
    elevation: number;
    azimuth: number;
    rising: boolean;
    friendly_name: "Sun";
  };
};

/**
 * revive dates in "sun.sun" entity
 * @param s
 */
export function reviveSunState(s: State): Sun {
  return {
    ...s,
    state: s.state as "above_horizon" | "below_horizon",
    attributes: {
      next_dawn: new Date(s.attributes.next_dawn as string),
      next_dusk: new Date(s.attributes.next_dusk as string),
      next_midnight: new Date(s.attributes.next_midnight as string),
      next_noon: new Date(s.attributes.next_noon as string),
      next_rising: new Date(s.attributes.next_rising as string),
      next_setting: new Date(s.attributes.next_setting as string),
      elevation: s.attributes.elevation as number,
      azimuth: s.attributes.azimuth as number,
      rising: s.attributes.rising as boolean,
      friendly_name: "Sun",
    },
  };
}
