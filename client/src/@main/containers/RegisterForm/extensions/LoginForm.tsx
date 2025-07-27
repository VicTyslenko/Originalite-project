import { actionFetchAuth } from "@main/store/actions/authActions";
import { Checkbox } from "@mui/material";
import { validationSchema } from "components/Header/components/DropdownRegister/validation";
import { Form, Formik } from "formik";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "utils/local-storage";

import {
  ButtonWrapp,
  CheckBoxWrapp,
  CssTextField,
  Description,
  InputsWrapp,
  LoginWrapper,
  StyledButton,
} from "../StyledRegisterForm";
import { useFormLogin } from "../hooks/use-form-login";
import type { LoginProps } from "../models";

export const LoginForm = () => {
  const dispatch = useStoreDispatch();

  const { errorMessage } = useFormLogin();
  const navigate = useNavigate();

  return (
    <>
      <Formik<LoginProps>
        initialValues={{
          loginOrEmail: "",
          password: "",
          keepSignedIn: false,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          if (values.keepSignedIn) {
            LocalStorage.setKeepSignIn("true");
          } else {
            LocalStorage.removeKeepSignIn();
          }

          const data = await dispatch(actionFetchAuth(values));

          if (data.meta.requestStatus === "fulfilled") {
            navigate("/");
            toast.success("Login successfull!");
            resetForm();
          } else {
            console.error("Error:", data.payload);
          }
        }}
      >
        {props => (
          <LoginWrapper>
            <Description>Please enter your account details to log in</Description>

            <Form onSubmit={props.handleSubmit}>
              <InputsWrapp>
                <CssTextField
                  variant="standard"
                  label="E-mail"
                  fullWidth
                  name="loginOrEmail"
                  value={props.values.loginOrEmail}
                  onChange={props.handleChange}
                  error={props.touched.loginOrEmail && Boolean(props.errors.loginOrEmail)}
                  helperText={props.touched.loginOrEmail && props.errors.loginOrEmail}
                />
                <CssTextField
                  variant="standard"
                  label="Password"
                  fullWidth
                  name="password"
                  type="password"
                  value={props.values.password}
                  onChange={props.handleChange}
                  error={props.touched.password && Boolean(props.errors.password)}
                  helperText={props.touched.password && props.errors.password}
                />
              </InputsWrapp>
              {errorMessage && !Object.keys(props.errors).length && (
                <span className="error-message">{Object.values(errorMessage)}</span>
              )}
              <CheckBoxWrapp>
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)": {
                      color: "white",
                    },
                  }}
                  name="keepSignedIn"
                  value={props.values.keepSignedIn}
                  onChange={props.handleChange}
                />
                <p className="box-text">Keep me signed in</p>
              </CheckBoxWrapp>
              Keep me signed in
              <ButtonWrapp>
                <StyledButton type="submit">LOG IN</StyledButton>
              </ButtonWrapp>
            </Form>
          </LoginWrapper>
        )}
      </Formik>
    </>
  );
};
