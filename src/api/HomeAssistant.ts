import { Config } from "./model";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createConnection } from "home-assistant-js-websocket";
import { createSocket } from "./createSocket";
import { HassEventEmitter, HomeAssistantWs } from "./HomeAssistantWs";

export class HomeAssistant {
  private readonly client: AxiosInstance;

  constructor(
    private readonly token: string,
    private readonly host: string = "localhost",
    private readonly port = 8123,
  ) {
    this.client = axios.create({
      baseURL: port === 443 ? `https://${host}/api` : `http://${host}:${port}`,
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  }

  public async getWebsocket(): Promise<HassEventEmitter> {
    const { version } = await this.config();
    const wsUrl = this.port === 443
      ? `wss://${this.host}/api/websocket`
      : `ws://${this.host}:${this.port}/api/websocket`;

    const connection = await createConnection({
      createSocket: createSocket(version, wsUrl, this.token),
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
