import toast from "react-hot-toast";
import { publicInstance } from "services/api/axios";

export const resendLink = async (email: string) => {
  try {
    await publicInstance.post("customers/resend-email", {
      email,
    });

    toast.success("The mail was resent!");
  } catch (error) {
    toast.error("Something went wrong, try again");
    console.error(error);
  }
};
