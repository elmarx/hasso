import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { createConnection } from "home-assistant-js-websocket";
import { createSocket } from "./createSocket";
import { HassEventEmitter, HomeAssistantWs } from "./HomeAssistantWs";
import { URL } from "url";
import { toWebsocket } from "../utils/toWebsocket";
import { Config, State } from "./api";
import { isError, tryF } from "ts-try";
import { ApiResponse } from "./model";

function isAxiosError<T>(o: unknown): o is AxiosError<T> {
  return isError(o) && (o as any).isAxiosError;
}

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

  public async getWebsocket(): Promise<HassEventEmitter> {
    const { version } = await this.config();
    const wsUrl = toWebsocket(this.url);
    wsUrl.pathname = "/api/websocket";

    const connection = await createConnection({
      createSocket: createSocket(version, wsUrl.toString(), this.token),
    });

    return new HomeAssistantWs(connection);
  }

  public async config(): Promise<Config> {
    const response: AxiosResponse<Config> = await this.client.get<Config>(
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

  /**
   * Returns a state object for specified entity_id. Returns 404 if not found.
   * @param entityId
   */
  public async state(entityId: string): Promise<ApiResponse<State>> {
    return this.get("/states/" + entityId);
  }

  public async stateList(): Promise<ApiResponse<State[]>> {
    return this.get("/states");
  }
}
