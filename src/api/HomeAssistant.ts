import { Config } from "./model";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createConnection } from "home-assistant-js-websocket";
import { createSocket } from "./createSocket";
import { HassEventEmitter, HomeAssistantWs } from "./HomeAssistantWs";
import { URL } from "url";
import { toWebsocket } from "../utils/toWebsocket";

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
}
