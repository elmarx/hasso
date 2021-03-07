import assert from "assert";
import { HomeAssistant } from "../src";

export function ha(): HomeAssistant {
  const token = process.env.HASS_TOKEN;
  const hassUrl = process.env.HASS_URL;
  assert(token);
  assert(hassUrl);

  return new HomeAssistant(token, hassUrl);
}

async function main() {
  const api = ha();

  const result = await api.config();
  console.log(result);
}

if (require.main === module) {
  main().catch((err) => console.error(err));
}
