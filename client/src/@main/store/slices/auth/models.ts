import { AxiosError } from "axios";
import { type UserModels } from "shared/models/user.models";

export type ValidationError = {
  [key: string]: string;
};

export interface InitialStateProps {
  status: string;
  error: AxiosError | null;
  data: UserModels | null;
}
