export function toWebsocket(u: string): URL {
  const url = new URL(u);

  switch (url.protocol) {
    case "http:":
      url.protocol = "ws:";
      break;
    case "https:":
      url.protocol = "wss:";
      break;
    default:
      throw new Error(`unknown format "${url.protocol}"`);
  }

  return url;
}
