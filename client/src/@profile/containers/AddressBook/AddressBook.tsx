import { Container } from "@mui/material";
import { useUserData } from "hooks/use-user-data";
import { DefaultTypography } from "shared/components/typography/default-typography";

import { BillingWrapp, ContainerWrapper, DeliveryWrapp, Details, MainWrapp, StyledButton } from "./StyledAddressBook";

function AddressBook() {
  const { user } = useUserData();

  const details = () => (
    <Details>
      Email:
      <DefaultTypography as="h3"> {user?.email || ""}</DefaultTypography>
      Address:
      <DefaultTypography as="h3">{user?.address || ""}</DefaultTypography>
      Telephone:
      <DefaultTypography as="h3">{user?.telephone || ""}</DefaultTypography>
    </Details>
  );

  return (
    <ContainerWrapper>
      <Container
        maxWidth="lg"
        sx={{
          marginBottom: "50px",
        }}
      >
        <MainWrapp>
          <DeliveryWrapp>
            {details()}
            <DefaultTypography>Delivery address</DefaultTypography>
            <StyledButton>Add new address</StyledButton>
          </DeliveryWrapp>

          <BillingWrapp>
            {details()}
            <DefaultTypography>Billing address</DefaultTypography>

            <StyledButton>Add new address</StyledButton>
          </BillingWrapp>
        </MainWrapp>
      </Container>
    </ContainerWrapper>
  );
}

export default AddressBook;
