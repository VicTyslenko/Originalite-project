import { type LoginProps } from "@main/containers/RegisterForm/models";

import privateInstance from "./axios";

export const authAPI = (params: LoginProps) => {
  return privateInstance.post("/customers/login", params);
};
