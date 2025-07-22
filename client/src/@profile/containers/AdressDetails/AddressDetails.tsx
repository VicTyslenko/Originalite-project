import { Container, TextField } from "@mui/material";
import { Formik } from "formik";
import { DefaultButton } from "shared/components/typography/default-button/default-button";

import { validationDeliverySchema } from "../../validation";
import * as S from "./StyledAddressDetails";
import { useAddressDetails } from "./hooks";

const AddressDetails = () => {
  const { user, handleFormSubmit, serverError } = useAddressDetails();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Formik
        initialValues={{
          firstName: user?.firstName || "",
          lastName: user?.lastName || "",
          email: user?.email || "",
          telephone: user?.telephone || "",
          address: user?.address || "",
        }}
        enableReinitialize
        validationSchema={validationDeliverySchema}
        onSubmit={(values, { resetForm }) => handleFormSubmit({ values, resetForm })}
      >
        {props => (
          <S.ContentForm>
            <form onSubmit={props.handleSubmit}>
              <S.Title>Please, fill the form with your details and delivery address</S.Title>

              <TextField
                type="text"
                fullWidth
                name="email"
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
                label="Email Adress"
                placeholder="Email"
                multiline
                variant="standard"
                sx={{ mb: "6px" }}
              />
              <TextField
                type="text"
                fullWidth
                name="firstName"
                label="First Name"
                value={props.values.firstName}
                placeholder="Your first name"
                multiline
                variant="standard"
                onChange={props.handleChange}
                error={props.touched.firstName && Boolean(props.errors.firstName)}
                helperText={props.touched.firstName && props.errors.firstName}
              />
              <TextField
                name="lastName"
                type="string"
                fullWidth
                label="Last name"
                placeholder="Your second name"
                multiline
                variant="standard"
                value={props.values.lastName}
                onChange={props.handleChange}
                error={props.touched.lastName && Boolean(props.errors.lastName)}
                helperText={props.touched.lastName && props.errors.lastName}
                sx={{ mb: "6px" }}
              />

              <TextField
                type="tel"
                fullWidth
                name="telephone"
                label="Mobile Phone"
                placeholder="+44"
                multiline
                variant="standard"
                value={props.values.telephone}
                onChange={props.handleChange}
                error={props.touched.telephone && Boolean(props.errors.telephone)}
                helperText={props.touched.telephone && props.errors.telephone}
                sx={{ mb: "6px" }}
              />
              <TextField
                type="text"
                fullWidth
                label="Address"
                placeholder="address"
                name="address"
                multiline
                variant="standard"
                value={props.values.address}
                onChange={props.handleChange}
                error={props.touched.address && Boolean(props.errors.address)}
                helperText={props.touched.address && props.errors.address}
                sx={{ mb: "6px" }}
              />
              {serverError && <span className="server-error">{Object.values(serverError)}</span>}

              <S.ButtonWrapp>
                <DefaultButton type="submit">Save</DefaultButton>
              </S.ButtonWrapp>
            </form>
          </S.ContentForm>
        )}
      </Formik>
    </Container>
  );
};

export default AddressDetails;
