import { publicInstance } from "services/api/axios";

export const resendEmailLink = (email: string) => publicInstance.post("customers/resend-email", { email });
