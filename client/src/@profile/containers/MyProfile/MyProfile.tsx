import { updateCustomer } from "@main/store/actions/customersActions";
import { Button, Container, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Formik } from "formik";
import { useStoreDispatch } from "hooks/use-store-dispatch";
import toast from "react-hot-toast";
import { useStoreSelector } from "shared/hooks/global/use-store-selector";

import { useUserData } from "../../../hooks/use-user-data";
import { ContainerWrapp, ContentForm, Form, Title } from "./StyledMyProfile";
import * as S from "./StyledMyProfile";
import { type UpdateCustomerProps } from "./models";
import validationSchema from "./validation";

function MyProfile() {
  const dispatch = useStoreDispatch();

  const { user } = useUserData();
  console.log(user);
  const errorMessage = useStoreSelector(state => state.auth.error);

  const handleSubmit = async ({ values, resetForm }: { values: UpdateCustomerProps; resetForm: () => void }) => {
    if (user) {
      const updateResponse = await dispatch(updateCustomer({ _id: user.id, params: values }));

      if (updateResponse.meta.requestStatus === "fulfilled") {
        toast.success("Account update success!");
        resetForm();
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Title>My Account</Title>

      <ContainerWrapp>
        <ContentForm>
          <Formik<UpdateCustomerProps>
            initialValues={{
              firstName: user?.firstName || "",
              lastName: user?.lastName || "",
              email: user?.email || "",
              telephone: user?.telephone || "",
              birthday: user?.birthday || "",
              gender: user?.gender || "male",
            }}
            enableReinitialize
            onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}
            validationSchema={validationSchema}
          >
            {props => (
              <Form onSubmit={props.handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="Email"
                  value={props.values.email}
                  helperText={props.touched.email && props.errors.email}
                  error={Boolean(props.touched.email && props.errors.email)}
                  onChange={props.handleChange}
                  variant="standard"
                  sx={{ mb: "6px" }}
                />
                <TextField
                  fullWidth
                  name="firstName"
                  placeholder="Name"
                  value={props.values.firstName}
                  onChange={props.handleChange}
                  variant="standard"
                  sx={{ mb: "6px" }}
                />
                <TextField
                  fullWidth
                  name="lastName"
                  placeholder="Last name"
                  value={props.values.lastName}
                  onChange={props.handleChange}
                  variant="standard"
                  sx={{ mb: "6px" }}
                />

                <TextField
                  fullWidth
                  name="telephone"
                  onChange={props.handleChange}
                  value={props.values.telephone}
                  placeholder="Mobile"
                  helperText={props.touched.telephone && props.errors.telephone}
                  error={props.touched.telephone && Boolean(props.errors.telephone)}
                  variant="standard"
                  sx={{ mb: "6px" }}
                />
                <FormControl>
                  <RadioGroup
                    sx={{ borderRadius: "12px" }}
                    row
                    name="gender"
                    value={props.values.gender}
                    onChange={e => props.setFieldValue("gender", e.target.value)}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />

                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>

                <TextField
                  fullWidth
                  name="birthday"
                  value={props.values.birthday}
                  onChange={props.handleChange}
                  label="Birthday"
                  placeholder="dd-mm-yyyy"
                  variant="standard"
                  helperText={props.touched.birthday && props.errors.birthday}
                  error={Boolean(props.errors.birthday && props.errors.birthday)}
                  sx={{ mb: "6px" }}
                />

                {/* {errorMessage && !Object.keys(props?.errors).length && (
									<span className="error-message">{Object.values(errorMessage)}</span>
								)} */}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                  }}
                >
                  SAVE
                </Button>
              </Form>
            )}
          </Formik>
          {errorMessage && <S.ErrorMessage>{Object.values(errorMessage)}</S.ErrorMessage>}
        </ContentForm>
      </ContainerWrapp>
    </Container>
  );
}

export default MyProfile;
