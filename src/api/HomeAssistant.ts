import { Config } from "./model";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createConnection, Connection } from "home-assistant-js-websocket";
import { createSocket } from "./createSocket";

export class HomeAssistant {
  private readonly client: AxiosInstance;
  private readonly wsUrl: string;

  constructor(private token: string, host: string = "localhost", port = 8123) {
    this.client = axios.create({
      baseURL: port === 443 ? `https://${host}/api` : `http://${host}:${port}`,
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    this.wsUrl =
      port === 443
        ? `wss://${host}/api/websocket`
        : `ws://${host}:${port}/api/websocket`;
  }

  public async config(): Promise<Config> {
    const response: AxiosResponse<Config> = await this.client.get<Config>(
      "/config",
    );

    return response.data;
  }

  public async createConnection(): Promise<Connection> {
    const { version } = await this.config();

    return createConnection({
      createSocket: createSocket(version, this.wsUrl, this.token),
    });
  }
}
