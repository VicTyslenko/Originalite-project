import { registerFetchData } from "@main/store/actions/registrationActions";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { resendEmailLink } from "services/api/resendLink";


import type { SubmitProps } from "../models";
export const useRegister = () => {
  const dispatch = useStoreDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const currentTab = searchParams.get("tab") || "login";

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setSearchParams(searchParameters => {
      searchParameters.set("tab", path);
      return searchParameters;
    });
  };
  // form submit handler
  const handleFormSubmit = async ({ values, resetForm }: SubmitProps) => {
    try {
      await dispatch(registerFetchData(values)).unwrap();

      // setOpen(true);
      // resetForm();
    } catch (error: any) {
      const message = error?.message || Object.values(error || {}).join(", ");
      setErrorMessage(message);
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    navigate("/");
  };

  // resend email link handler
  const handleResendLink = async (email: string) => {
    try {
      const response = await resendEmailLink(email);

      if (response.status === 200) {
        toast.success("The mail was resent!");
        handleModalClose();
      }
    } catch (error) {
      toast.error("Something went wrong, try again");
      console.error(error);
    }
  };

  return { handleModalClose, handleNavigate, currentTab, handleFormSubmit, open, handleResendLink, errorMessage };
};
