import { useFormLogin } from "@main/containers/RegisterForm/hooks/use-form-login";
import { Button, Container } from "@mui/material";
import { Checkbox } from "@mui/material";
import { Formik } from "formik";
import type { Height } from "react-animate-height";
import { DefaultTypography } from "shared/components/typography/default-typography";

import {
  BoxWrapp,
  ButtonBlock,
  CheckBoxWrapp,
  FormPages,
  Header,
  InputItem,
  InputsWrapp,
  LoaderWrapp,
  SignUpNavigate,
  WrappAnimate,
} from "./StyledDropdownRegister";
import { validationSchema } from "./validation";

function DropdownRegister({ active }: { active: Height }) {
  const { errorMessage, loader, handleFormSubmit, handleCloseModal } = useFormLogin();

  return (
    <WrappAnimate id="example-panel" duration={500} height={active}>
      <Container maxWidth="lg">
        <BoxWrapp>
          <Header>
            <span className="details">Enter your details</span>
          </Header>
          <Formik
            initialValues={{
              loginOrEmail: "",
              password: "",
              keepSignedIn: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => handleFormSubmit(values, resetForm)}
          >
            {props => {
              return (
                <form onSubmit={props.handleSubmit}>
                  <InputsWrapp>
                    <InputItem
                      variant="standard"
                      name="loginOrEmail"
                      label="E-mail"
                      value={props.values.loginOrEmail}
                      onChange={props.handleChange}
                      error={props.touched.loginOrEmail && Boolean(props.errors.loginOrEmail)}
                      helperText={props.touched.loginOrEmail && props.errors.loginOrEmail}
                    />
                    <InputItem
                      variant="standard"
                      name="password"
                      label="Password"
                      type="password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      error={props.touched.password && Boolean(props.errors.password)}
                      helperText={props.touched.password && props.errors.password}
                    />
                  </InputsWrapp>

                  <CheckBoxWrapp>
                    <Checkbox value={props.values.keepSignedIn} onChange={props.handleChange} name="keepSignedIn" />
                    <DefaultTypography>Keep me signed in</DefaultTypography>
                  </CheckBoxWrapp>

                  {errorMessage && !Object.keys(props?.errors).length && (
                    <span className="error-message">{Object.values(errorMessage)}</span>
                  )}

                  <ButtonBlock>
                    <Button variant="contained" color="success" type="submit">
                      Log in
                    </Button>
                  </ButtonBlock>
                </form>
              );
            }}
          </Formik>

          <FormPages>
            Not registered yet ?<SignUpNavigate onClick={handleCloseModal}>Sing Up</SignUpNavigate>
          </FormPages>
        </BoxWrapp>
      </Container>
      {loader && <LoaderWrapp>Logging in...</LoaderWrapp>}
    </WrappAnimate>
  );
}

export default DropdownRegister;
