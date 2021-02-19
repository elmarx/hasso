import { Config } from "./model";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class HomeAssistant {
  private readonly client: AxiosInstance;

  constructor(token: string, host: string = "localhost", port = 8123) {
    this.client = axios.create({
      baseURL: port == 443 ? `https://${host}/api` : `http://${host}:${port}`,
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
  }

  public async config(): Promise<Config> {
    const response: AxiosResponse<Config> = await this.client.get<Config>(
      "/config",
    );

    return response.data;
  }
}
