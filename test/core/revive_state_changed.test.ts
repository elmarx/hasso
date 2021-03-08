import { RawStateChanged } from "../../src/model/raw";
import { reviveStateChanged } from "../../src/core/revive";
import { StateChangedEvent } from "../../src";

test("reviveState", () => {
  const sample: RawStateChanged = {
    event_type: "state_changed" as any,
    data: {
      entity_id: "sensor.az_temperature_linkquality",
      old_state: {
        entity_id: "sensor.az_temperature_linkquality",
        state: "93",
        attributes: {},
        last_changed: "2021-03-08T18:06:27.672610+00:00",
        last_updated: "2021-03-08T18:06:30.093008+00:00",
        context: {
          id: "42",
          user_id: null,
          parent_id: null,
        },
      },
      new_state: {
        entity_id: "sensor.az_temperature_linkquality",
        state: "96",
        attributes: {},
        last_changed: "2021-03-08T18:06:30.095799+00:00",
        last_updated: "2021-03-08T18:06:30.095799+00:00",
        context: {
          id: "43",
          user_id: null,
          parent_id: null,
        },
      },
    },
    origin: "LOCAL",
    time_fired: "2021-03-08T18:06:30.095Z",
    context: {
      id: "89312e7ff9709666f8f3b7a6c805bdd9",
      parent_id: null,
      user_id: null,
    },
  };

  const expected: StateChangedEvent = {
    event_type: "state_changed" as any,
    data: {
      entity_id: "sensor.az_temperature_linkquality",
      old_state: {
        entity_id: "sensor.az_temperature_linkquality",
        state: "93",
        attributes: {},
        last_changed: new Date("2021-03-08T18:06:27.672610+00:00"),
        last_updated: new Date("2021-03-08T18:06:30.093008+00:00"),
        context: {
          id: "42",
          user_id: null,
          parent_id: null,
        },
      },
      new_state: {
        entity_id: "sensor.az_temperature_linkquality",
        state: "96",
        attributes: {},
        last_changed: new Date("2021-03-08T18:06:30.095799+00:00"),
        last_updated: new Date("2021-03-08T18:06:30.095799+00:00"),
        context: {
          id: "43",
          user_id: null,
          parent_id: null,
        },
      },
    },
    origin: "LOCAL",
    time_fired: new Date("2021-03-08T18:06:30.095Z"),
    context: {
      id: "89312e7ff9709666f8f3b7a6c805bdd9",
      parent_id: null,
      user_id: null,
    },
  };

  expect(reviveStateChanged(sample)).toEqual(expected);
});
