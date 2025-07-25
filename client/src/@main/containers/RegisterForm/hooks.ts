import { actionFetchAuth } from "@main/store/actions/authActions";
import { setLoader } from "@main/store/slices/auth/authSlice";
import { closeModal } from "@main/store/slices/modal/modalSlice";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";
import type { RegisterProps } from "shared/models/auth.models";
import { LocalStorage } from "utils/local-storage";

export const useFormLogin = () => {
  const dispatch = useStoreDispatch();
  const navigate = useNavigate();

  const errorMessage = useStoreSelector(state => state.auth.error);
  const loader = useStoreSelector(state => state.auth.loader);

  const handleFormSubmit = async (values: RegisterProps, resetForm: () => void) => {
    if (values.keepSignedIn) {
      LocalStorage.setKeepSignIn("true");
    } else {
      LocalStorage.removeKeepSignIn();
    }
    try {
      const data = await dispatch(actionFetchAuth(values));

      if (data.meta.requestStatus === "fulfilled") {
        toast.success("Login successful!");
        dispatch(closeModal());
        navigate("/");
        resetForm();
      } else if (data.meta.requestStatus === "rejected") {
        toast.error("Login failed, try again later");
        dispatch(closeModal());
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    navigate("/login-form");
  };

  return { errorMessage, loader, handleFormSubmit, handleCloseModal };
};
