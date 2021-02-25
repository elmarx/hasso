export type DeviceRegistryEntry = {
  id: string;
  config_entries: string[];
  connections: Array<[string, string]>;
  identifiers: Array<[string, string]>;
  manufacturer: string;
  model?: string;
  name?: string;
  sw_version?: string;
  via_device_id?: string;
  area_id?: string;
  name_by_user?: string;
  entry_type: "service" | null;
  disabled_by: string | null;
};

export type EntityRegistryEntry = {
  entity_id: string;
  name: string;
  icon?: string;
  platform: string;
  config_entry_id?: string;
  device_id?: string;
  area_id?: string;
  disabled_by: string | null;
};

export type ExtEntityRegistryEntry = EntityRegistryEntry & {
  unique_id: string;
  capabilities: Record<string, unknown>;
  original_name?: string;
  original_icon?: string;
};

export interface RelatedResult {
  area?: string[];
  automation?: string[];
  config_entry?: string[];
  device?: string[];
  entity?: string[];
  group?: string[];
  scene?: string[];
  script?: string[];
}
