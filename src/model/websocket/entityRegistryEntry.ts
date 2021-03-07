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
