import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { createConnection, HassConfig } from "home-assistant-js-websocket";
import { createSocket } from "./core/createSocket";
import { HomeAssistantWebSocket } from "./HomeAssistantWebSocket";
import { URL } from "url";
import { toWebsocket } from "./utils/toWebsocket";
import { isError, tryF } from "ts-try";
import { RawState } from "./model/raw";
import { Service, State } from "./model";
import { reviveStateState } from "./core/revive";

function isAxiosError<T>(o: unknown): o is AxiosError<T> {
  return isError(o) && (o as any).isAxiosError;
}

export type ApiResponse<T> = T | AxiosError<unknown>;

export class HomeAssistant {
  private readonly client: AxiosInstance;

  constructor(
    private readonly token: string,
    private readonly url: string = "http://localhost:8123",
  ) {
    const baseUrl = new URL(this.url);
    baseUrl.pathname = "/api";

    this.client = axios.create({
      baseURL: baseUrl.toString(),
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  }

  public async getWebsocket(): Promise<HomeAssistantWebSocket> {
    const { version } = await this.config();
    const wsUrl = toWebsocket(this.url);
    wsUrl.pathname = "/api/websocket";

    const connection = await createConnection({
      createSocket: createSocket(version, wsUrl.toString(), this.token),
    });

    return new HomeAssistantWebSocket(connection);
  }

  public async config(): Promise<HassConfig> {
    const response: AxiosResponse<HassConfig> = await this.client.get<
      HassConfig
    >(
      "/config",
    );

    return response.data;
  }

  /**
   * execute a get request
   */
  private async get<T>(path: string): Promise<ApiResponse<T>> {
    const response = await tryF<AxiosResponse<T>, AxiosError<T>>(
      this.client.get<T>(path),
    );

    if (isAxiosError<T>(response)) return response;

    return response.data;
  }

  private async getTransformed<R, T>(
    path: string,
    transformer: (r: R) => T,
  ): Promise<ApiResponse<T>> {
    const raw = await this.get<R>(path);

    if (isError(raw)) return raw;

    return transformer(raw);
  }

  /**
   * Returns a state object for specified entity_id. Returns 404 if not found.
   * @param entityId
   */
  public async state(entityId: string): Promise<ApiResponse<State>> {
    return this.getTransformed("/states/" + entityId, reviveStateState);
  }

  public async stateList(): Promise<ApiResponse<State[]>> {
    return this.getTransformed<RawState[], State[]>("/states", (r) =>
      r.map(reviveStateState)
    );
  }

  public async serviceList(): Promise<ApiResponse<Service[]>> {
    return this.get("/services");
  }
}
