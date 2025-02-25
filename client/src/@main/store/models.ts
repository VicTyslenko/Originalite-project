import type { UserData } from "shared/models/user.models";

export interface UserLoginProps {
  token: string;
  success: boolean;
  customer: UserData;
}

export type OrderProps = {
  orderId: string;
  params: {
    email: string;
    letterSubject: string;
    letterHtml: string;
    paymentStatus: string;
  };
};
