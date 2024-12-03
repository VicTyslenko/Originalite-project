import { Container } from '@mui/material';

import AddressBookMain from '../../components/AddressBookMain/AddressBookMain';
import { ContainerWrapper } from './StyledAddressBook';
function AddressBook() {
	return (
		<ContainerWrapper>
			<Container
				maxWidth="lg"
				sx={{
					marginBottom: '50px',
				}}
			>
				<AddressBookMain />
			</Container>
		</ContainerWrapper>
	);
}

export default AddressBook;
