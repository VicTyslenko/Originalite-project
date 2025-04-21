import { AxiosError } from "axios";

export interface InitialStateProps {
  status: string;
  error: AxiosError | null;
  data: {
    success: boolean;
    message: string;
  } | null;
}
