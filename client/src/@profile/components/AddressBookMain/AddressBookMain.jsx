import { useUserData } from "hooks/use-user-data";
import { DefaultTypography } from "shared/components/typography/default-typography";

import * as S from "./StyledAddressBookMain";
import { MainWrapp, StyledButton } from "./StyledAddressBookMain";

function AddressBookMain() {
	const user = useUserData();

	const details = () => (
		<S.Details>
			Email:
			<DefaultTypography as="h3"> {user.email || ""}</DefaultTypography>
			Address:
			<DefaultTypography as="h3">{user.address || ""}</DefaultTypography>
			Telephone:
			<DefaultTypography as="h3">{user.telephone || ""}</DefaultTypography>
		</S.Details>
	);

	return (
		<MainWrapp>
			<S.DeliveryWrapp>
				{details()}
				<DefaultTypography>Delivery address</DefaultTypography>
				<StyledButton>Add new address</StyledButton>
			</S.DeliveryWrapp>

			<S.BillingWrapp>
				{details()}
				<DefaultTypography>Billing address</DefaultTypography>

				<StyledButton>Add new address</StyledButton>
			</S.BillingWrapp>
		</MainWrapp>
	);
}

export default AddressBookMain;
