import { type AxiosRequestConfig } from "axios";

export interface ApiProps {
  config: AxiosRequestConfig;
  id?: string;
}

export type ProductParams = ApiProps & {
  data: {
    size: string | null;
    color: string | null;
  };
};
