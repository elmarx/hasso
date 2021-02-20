import { AxiosError } from "axios";

export type ApiResponse<T> = T | AxiosError<T>;
