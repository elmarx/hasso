import { reviveTimeFired } from "../../src/api/revive.events";

test("revive time_fired in events", () => {
  const sample = {
    event_type: "tag_scanned",
    data: {
      tag_id: "16d116c6-9889-400d-b21d-6c751e6ca800",
      device_id: "52db993260a5cf34",
    },
    origin: "LOCAL",
    time_fired: "2021-03-04T01:04:52.805794+00:00",
    context: {
      id: "d403d6fbbf9416918befd97460791725",
      parent_id: null,
      user_id: "b12491d844244afa84f0057d04466a08",
    },
  };

  const expected = {
    event_type: "tag_scanned",
    data: {
      tag_id: "16d116c6-9889-400d-b21d-6c751e6ca800",
      device_id: "52db993260a5cf34",
    },
    origin: "LOCAL",
    time_fired: new Date("2021-03-04T01:04:52.805794+00:00"),
    context: {
      id: "d403d6fbbf9416918befd97460791725",
      parent_id: null,
      user_id: "b12491d844244afa84f0057d04466a08",
    },
  };

  expect(reviveTimeFired(sample)).toEqual(expected);
});
