import MainWrapp from './StyledAddressBookMain';
import { StyledButton } from './StyledAddressBookMain';

function AddressBookMain() {
	return (
		<MainWrapp>
			<div className="delivery">
				<h3>
					<p className="address">address book</p>
					<p>delivery address</p>
				</h3>
				<StyledButton>Add new address</StyledButton>
			</div>
			<div className="billing">
				<p>billing address</p>
				<StyledButton>Add new address</StyledButton>
			</div>
		</MainWrapp>
	);
}

export default AddressBookMain;
