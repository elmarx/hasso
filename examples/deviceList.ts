import { ha } from "./index";

async function main() {
  const ws = await ha().getWebsocket();

  const deviceList = await ws.fetchDeviceRegistry();
  console.log(deviceList);

  ws.close();
}

main().catch(console.error);
