import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Container } from "@mui/system";
import { Formik } from "formik";

import PaymentModal from "../ShoppingCart/Modal/PaymentModal";
import {
  ButtonWrappReg,
  ContainerWrapper,
  CssTextField,
  HeadWrapp,
  InputsWrappReg,
  LoginWrapperReg,
  StyledButtonReg,
} from "./StyledRegisterForm";
import { LoginForm } from "./extensions/LoginForm";
import { useRegister } from "./hooks/use-register";
import type { RegisterProps } from "./models";
import { validationRegisterSchema } from "./validation";

const RegisterForm = () => {
  const { handleModalClose, handleNavigate, currentTab, handleFormSubmit, open, handleResendLink } = useRegister();

  return (
    <ContainerWrapper>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TabContext value={currentTab}>
          <HeadWrapp>
            <TabList
              onChange={(_, newValue) => {
                handleNavigate(newValue);
              }}
            >
              <Tab className="list-item login" label="Login" value="login" />
              <Tab className="list-item registration" label="Registration" value="registration" />
            </TabList>
          </HeadWrapp>

          <TabPanel value="login">
            <LoginForm />
          </TabPanel>

          <TabPanel value="registration">
            <Formik<RegisterProps>
              initialValues={{
                firstName: "",
                lastName: "",
                login: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationRegisterSchema}
              onSubmit={(values, { resetForm }) => {
                handleFormSubmit({ values, resetForm });
              }}
            >
              {props => (
                <LoginWrapperReg>
                  <form onSubmit={props.handleSubmit}>
                    <InputsWrappReg>
                      <label>
                        <p className="label-text">login</p>
                        <CssTextField
                          variant="standard"
                          label="Login"
                          name="login"
                          value={props.values.login}
                          onChange={props.handleChange}
                          error={props.touched.login && Boolean(props.errors.login)}
                          helperText={props.touched.login && props.errors.login}
                        />
                      </label>
                      <label>
                        <p className="label-text">first name</p>
                        <CssTextField
                          variant="standard"
                          label="Your first name"
                          name="firstName"
                          value={props.values.firstName}
                          onChange={props.handleChange}
                          error={props.touched.firstName && Boolean(props.errors.firstName)}
                          helperText={props.touched.firstName && props.errors.firstName}
                        />
                      </label>
                      <label>
                        <p className="label-text">Last name</p>
                        <CssTextField
                          variant="standard"
                          label="Your last name"
                          name="lastName"
                          value={props.values.lastName}
                          onChange={props.handleChange}
                          error={props.touched.lastName && Boolean(props.errors.lastName)}
                          helperText={props.touched.lastName && props.errors.lastName}
                        />
                      </label>
                      <label>
                        <p className="label-text">email address</p>
                        <CssTextField
                          variant="standard"
                          label="Email address"
                          name="email"
                          value={props.values.email}
                          onChange={props.handleChange}
                          error={props.touched.email && Boolean(props.errors.email)}
                          helperText={props.touched.email && props.errors.email}
                        />
                      </label>
                      <label>
                        <p className="label-text">password</p>
                        <CssTextField
                          variant="standard"
                          label="Password"
                          name="password"
                          type="password"
                          value={props.values.password}
                          onChange={props.handleChange}
                          error={props.touched.password && Boolean(props.errors.password)}
                          helperText={props.touched.password && props.errors.password}
                        />
                      </label>
                      <CssTextField
                        variant="standard"
                        label="Confirm your password"
                        name="confirmPassword"
                        type="password"
                        value={props.values.confirmPassword}
                        onChange={props.handleChange}
                        error={props.touched.confirmPassword && Boolean(props.errors.confirmPassword)}
                        helperText={props.touched.confirmPassword && props.errors.confirmPassword}
                      />
                    </InputsWrappReg>

                    <ButtonWrappReg>
                      <StyledButtonReg type="submit">Register</StyledButtonReg>
                    </ButtonWrappReg>

                    <PaymentModal
                      open={open}
                      close={handleModalClose}
                      text="We sent you a link, please verify your email."
                      confirm={handleModalClose}
                      cancel={() => {
                        handleResendLink(props.values.email);

                        handleModalClose();
                      }}
                      actions
                      confirmText="Continue to main page"
                      cancelText="Resend email"
                      customStyles={{ minWidth: "500px", border: "1px solid #fff" }}
                    />
                  </form>
                </LoginWrapperReg>
              )}
            </Formik>
          </TabPanel>
        </TabContext>
      </Container>
    </ContainerWrapper>
  );
};

export default RegisterForm;
