import { actionFetchAuth } from "@main/store/actions/authActions";
import { Checkbox } from "@mui/material";
import { Form, Formik } from "formik";
import { useStoreDispatch } from "hooks/use-store-dispatch";

import {
  ButtonWrapp,
  CheckBoxWrapp,
  CssTextField,
  Description,
  InputsWrapp,
  LoginWrapper,
  StyledButton,
} from "../StyledRegisterForm";

export const LoginForm = () => {
  const dispatch = useStoreDispatch();
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async values => {
          await dispatch(actionFetchAuth(values));
        }}
      >
        <LoginWrapper>
          <Description>Please enter your account details to log in</Description>
          <Form>
            <InputsWrapp>
              <CssTextField variant="standard" label="E-mail" fullWidth />
              <CssTextField variant="standard" label="Password" fullWidth />
            </InputsWrapp>
            <CheckBoxWrapp>
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)": {
                    color: "white",
                  },
                }}
              />
              <p className="box-text">Keep me signed in</p>
            </CheckBoxWrapp>

            <ButtonWrapp>
              <StyledButton>LOG IN</StyledButton>
            </ButtonWrapp>
          </Form>
        </LoginWrapper>
      </Formik>
    </>
  );
};
