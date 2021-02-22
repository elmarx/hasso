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
