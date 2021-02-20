export type Context = {
  id: string;
  parent_id: string | null;
  user_id: string | null;
};

/** actual api responses **/

export type Config = {
  version: string;
};

export type State = {
  entity_id: string;
  state: string;
  attributes: Record<string, string | boolean | number>;
  last_changed: string;
  last_updated: string;
  context: Context;
};
