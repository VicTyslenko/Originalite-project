import { AxiosError } from "axios";
import type { UserModels } from "shared/models/user.models";

export type InitialStateProps = {
  error: AxiosError | null;
  tempData: UserModels | null;
};
