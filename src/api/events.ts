export const enum Event {
  TAG_SCANNED = "tag_scanned",
}

export type TagScannedEvent = {
  event_type: Event.TAG_SCANNED;
  data: {
    tag_id: string;
    device_id: string;
  };
  origin: string;
  time_fired: string;
  context: {
    id: string;
    parent_id: null;
    user_id: string;
  };
};

export interface HassEvents {
  [Event.TAG_SCANNED]: (event: TagScannedEvent) => unknown;
}
