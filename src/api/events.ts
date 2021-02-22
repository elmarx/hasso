import { Context, State } from "./api";

// events as returned via `curl -s -H "Authorization: Bearer $HASS_TOKEN" $HASS_URL/api/events | jq .[].event | sort | uniq`
// then replace `^"(.*)"$` with `\U$1\E = "$1",`
export const enum Event {
  COMPONENT_LOADED = "component_loaded",
  CORE_CONFIG_UPDATED = "core_config_updated",
  DEVICE_REGISTRY_UPDATED = "device_registry_updated",
  ENTITY_REGISTRY_UPDATED = "entity_registry_updated",
  HOMEASSISTANT_CLOSE = "homeassistant_close",
  HOMEASSISTANT_START = "homeassistant_start",
  HOMEASSISTANT_STOP = "homeassistant_stop",
  PLATFORM_DISCOVERED = "platform_discovered",
  STATE_CHANGED = "state_changed",
  TAG_SCANNED = "tag_scanned",
  USER_REMOVED = "user_removed",
}

export type TagScannedEvent = {
  event_type: Event.TAG_SCANNED;
  data: {
    tag_id: string;
    device_id: string;
  };
  origin: string;
  time_fired: string;
  context: Context;
};

export type StateChangedEvent = {
  event_type: Event.STATE_CHANGED;
  data: {
    entity_id: string;
    old_state: State;
    new_state: State;
  };
  origin: string;
  time_fired: string;
  context: Context;
};

export interface HassEvents {
  [Event.TAG_SCANNED]: (event: TagScannedEvent) => unknown;
  [Event.STATE_CHANGED]: (event: StateChangedEvent) => unknown;
}
