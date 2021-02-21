import { ha } from "./index";

ha().serviceList().then(console.log).catch(console.error);
