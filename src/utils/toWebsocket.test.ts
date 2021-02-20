import { toWebsocket } from "./toWebsocket";

test("http to ws", () => {
  const sample = "http://example.com:8123";

  const actual = toWebsocket(sample);

  expect(actual.toString()).toBe("ws://example.com:8123/");
});

test("https to wss", () => {
  const sample = "https://example.com:8123";

  const actual = toWebsocket(sample);

  expect(actual.toString()).toBe("wss://example.com:8123/");
});
