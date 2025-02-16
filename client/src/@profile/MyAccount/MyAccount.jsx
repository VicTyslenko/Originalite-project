import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { Container } from "@mui/system";
import { useSearchParams } from "react-router-dom";

import AddressBook from "../containers/AddressBook";
import MyProfile from "../containers/MyProfile";
import PurchaseHistory from "../containers/PurchaseHistory";
import Wishlist from "../containers/Wishlist";
import { InnerWrapper, Title } from "./StyledMyAccount";

function MyAccount() {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentTab = searchParams.get("tab") || "my-profile";

	const handleNavigate = path => {
		setSearchParams(searchParameters => {
			searchParameters.set("tab", path);
			return searchParameters;
		});
	};

	return (
		<Container maxWidth="lg">
			<Title>My account</Title>
			<InnerWrapper>
				<TabContext value={currentTab}>
					<TabList
						onChange={(_, newValue) => {
							handleNavigate(newValue);
						}}
					>
						<Tab label="My Profile" value="my-profile" />
						<Tab label="Wishlist" value="wishlist" />
						<Tab label="Purchase History" value="purchase-history" />
						<Tab label="Address Book" value="address-book" />
					</TabList>

					<TabPanel value="my-profile">
						<MyProfile />
					</TabPanel>
					<TabPanel value="wishlist">
						<Wishlist />
					</TabPanel>
					<TabPanel value="purchase-history">
						<PurchaseHistory />
					</TabPanel>
					<TabPanel value="address-book">
						<AddressBook />
					</TabPanel>
				</TabContext>
			</InnerWrapper>
		</Container>
	);
}

export default MyAccount;
