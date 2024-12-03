import { useEffect } from 'react';
import { Container, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MainContent, Header, TableCellTitle, TableCellName, TableItem } from './StyledUsers';
import { useSelector, useDispatch } from 'react-redux';
import { usersSelector } from '../../store/selectors/usersSelector';
import { usersFetchData } from '../../store/actions/usersAction';

function EditUsers() {
	const dispatch = useDispatch();

	const { data } = useSelector(usersSelector);

	useEffect(() => {
		dispatch(usersFetchData());
	}, []);

	const usersList = data?.map(({ firstName, email, isAdmin, date, _id }, index) => (
		<TableRow key={_id}>
			<TableItem align="left" colSpan={1}>
				{index + 1}
			</TableItem>
			<TableItem align="left" colSpan={2}>
				{firstName}
			</TableItem>
			<TableItem align="center" colSpan={2}>
				{!isAdmin ? 'user' : 'admin'}
			</TableItem>
			<TableItem align="left" colSpan={4}>
				{email}
			</TableItem>
			<TableItem align="left" colSpan={2}>
				action
			</TableItem>
			<TableItem align="center" colSpan={2}>
				{date.slice(0, 10)}
			</TableItem>
		</TableRow>
	));

	return (
		<Container maxWidth="lg">
			<Header>Users</Header>
			<MainContent>
				<TableContainer component={Paper} sx={{ mt: '40px', mb: '80px' }}>
					<Table sx={{ width: '100%' }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<TableCellTitle align="left" colSpan={6}>
									Currently showing all users
								</TableCellTitle>
								<TableCell align="right" colSpan={6}></TableCell>
							</TableRow>
							<TableRow>
								<TableCellName align="left" colSpan={1}>
									#
								</TableCellName>
								<TableCellName align="left" colSpan={2}>
									Name
								</TableCellName>
								<TableCellName align="center" colSpan={2}>
									Role
								</TableCellName>
								<TableCellName align="left" colSpan={4}>
									Email
								</TableCellName>
								<TableCellName align="left" colSpan={2}>
									Action
								</TableCellName>
								<TableCellName align="center" colSpan={2}>
									Date Posted
								</TableCellName>
							</TableRow>

							{usersList}
						</TableHead>
					</Table>
				</TableContainer>
			</MainContent>
		</Container>
	);
}

export default EditUsers;
