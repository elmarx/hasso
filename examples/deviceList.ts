import { ha } from "./index";
import { isError } from "ts-try";

async function main() {
  const ws = await ha().getWebsocket();

  const deviceList = await ws.fetchDeviceRegistry();

  if (isError(deviceList)) {
    console.error(deviceList);
    ws.close();
    return;
  }

  for (const device of deviceList) {
    const related = await ws.findRelated("device", device.id);

    console.log({ device, related });
  }

  ws.close();
}

main().catch(console.error);
