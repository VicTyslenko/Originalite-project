import { type AxiosRequestConfig } from "axios";

export interface ApiProps {
  config: AxiosRequestConfig;
  id?: string;
  data?: Record<string, any>;
}
