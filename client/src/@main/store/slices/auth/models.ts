import { AxiosError } from "axios";
import type { UserModels } from "shared/models/user.models";

export interface InitialStateProps {
  status: string;
  error: AxiosError | null;
  data: UserModels | null;
  isLoggedOut: boolean;
}
