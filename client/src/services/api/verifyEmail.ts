import { publicInstance } from "./axios";

export const verifyEmail = ({ token }: { token: string }) => {
  return publicInstance.get(`customers/verify/${token}`);
};
