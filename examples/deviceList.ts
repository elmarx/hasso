import { ha } from "./index";

const api = ha();

api.getWebsocket().then((ws) => {
  ws.getDeviceList().then(console.log);
});
