import { JsonArray, JsonPrimitive, JsonValue } from "../json";
import { Domain } from "./domain";

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
