import { RawState } from "../../src/model/raw";
import { reviveStateState } from "../../src/core/revive";
import { State } from "../../src";

test("reviveState", () => {
  const sample: RawState = {
    entity_id: "sun.sun",
    state: "below_horizon",
    attributes: {
      next_dawn: "2021-03-04T05:27:41+00:00",
      next_dusk: "2021-03-04T17:40:12+00:00",
      next_midnight: "2021-03-04T23:33:38+00:00",
      next_noon: "2021-03-04T11:33:57+00:00",
      next_rising: "2021-03-04T06:00:59+00:00",
      next_setting: "2021-03-04T17:06:54+00:00",
      elevation: -44.7,
      azimuth: 0.04,
      rising: true,
      friendly_name: "Sun",
    },
    last_changed: "2021-03-03T20:45:31.039023+00:00",
    last_updated: "2021-03-03T23:33:51.010030+00:00",
    context: {
      id: "13883bd95c93eff5e98dd00122e4e23e",
      parent_id: null,
      user_id: null,
    },
  };

  const expected: State = {
    entity_id: "sun.sun",
    state: "below_horizon",
    attributes: {
      next_dawn: "2021-03-04T05:27:41+00:00",
      next_dusk: "2021-03-04T17:40:12+00:00",
      next_midnight: "2021-03-04T23:33:38+00:00",
      next_noon: "2021-03-04T11:33:57+00:00",
      next_rising: "2021-03-04T06:00:59+00:00",
      next_setting: "2021-03-04T17:06:54+00:00",
      elevation: -44.7,
      azimuth: 0.04,
      rising: true,
      friendly_name: "Sun",
    },
    last_changed: new Date("2021-03-03T20:45:31.039023+00:00"),
    last_updated: new Date("2021-03-03T23:33:51.010030+00:00"),
    context: {
      id: "13883bd95c93eff5e98dd00122e4e23e",
      parent_id: null,
      user_id: null,
    },
  };

  expect(reviveStateState(sample)).toEqual(expected);
});
