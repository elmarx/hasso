import { Context } from "./context";
import { HassEntityAttributeBase } from "home-assistant-js-websocket";

export type State = {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributeBase &
    Record<string, string | boolean | number>;
  last_changed: Date;
  last_updated: Date;
  context: Context;
};
