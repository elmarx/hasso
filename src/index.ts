import assert from "assert";
import { HomeAssistant } from "./api/HomeAssistant";

async function main() {
  const token = process.env.HASS_TOKEN;
  const host = process.env.HASS_HOST;
  const port = process.env.HASS_PORT;
  assert(token);
  assert(host);
  assert(port);

  const api = new HomeAssistant(token, host, parseInt(port));

  const config = await api.config();

  console.log(config.version);
}

if (require.main === module) {
  main().catch((err) => console.error(err));
}
