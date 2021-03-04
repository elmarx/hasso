import { JsonArray, JsonPrimitive, JsonValue } from "./model";

export type Context = {
  id: string;
  parent_id: string | null;
  user_id: string | null;
};

// list of domains generated via `curl -s -H "Authorization: Bearer $HASS_TOKEN" $HASS_URL/api/services | jq .[].domain | sort | uniq`
export type Domain =
  | "automation"
  | "cast"
  | "cloud"
  | "counter"
  | "device_tracker"
  | "frontend"
  | "group"
  | "homeassistant"
  | "input_boolean"
  | "input_datetime"
  | "input_number"
  | "input_select"
  | "input_text"
  | "kodi"
  | "light"
  | "logbook"
  | "media_player"
  | "mqtt"
  | "notify"
  | "persistent_notification"
  | "person"
  | "recorder"
  | "scene"
  | "script"
  | "stream"
  | "switch"
  | "system_log"
  | "timer"
  | "tts"
  | "zone";

/** actual api responses **/

export type Config = {
  version: string;
};

export type State = {
  entity_id: string;
  state: string;
  attributes: Record<string, string | boolean | number>;
  last_changed: Date;
  last_updated: Date;
  context: Context;
};

export type Service = {
  domain: Domain;
  services: {
    [name: string]: {
      description: string;
      fields?: {
        [fieldName: string]: {
          description: string;
          example?: JsonValue;
          default?: JsonPrimitive;
          values?: JsonArray;
        };
      };
    };
  };
};
