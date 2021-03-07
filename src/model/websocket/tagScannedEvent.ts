import { Context } from "../context";
import { HassEvent } from "./events";

export type TagScannedEvent = {
  event_type: HassEvent.TAG_SCANNED;
  data: {
    tag_id: string;
    device_id: string;
  };
  origin: string;
  time_fired: Date;
  context: Context;
};
