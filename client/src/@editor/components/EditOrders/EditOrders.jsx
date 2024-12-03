import React from 'react';
import { Container, Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { MainContent, Header, TableCellTitle, TableCellName, TableItem } from './StyledOrders';

function EditUsers() {
	return (
		<Container maxWidth="lg">
			<Header>Orders</Header>
			<MainContent>
				<TableContainer component={Paper} sx={{ mt: '40px' }}>
					<Table sx={{ width: '100%' }} aria-label="customized table">
						<TableHead>
							<TableRow>
								<TableCellTitle align="left" colSpan={6}>
									Currently showing all orders
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
									Address
								</TableCellName>
								<TableCellName align="left" colSpan={4}>
									Email
								</TableCellName>
								
								<TableCellName align="center" colSpan={2}>
									Date Posted
								</TableCellName>
							</TableRow>
							<TableRow>
								<TableItem align="left" colSpan={1}>
									1
								</TableItem>
								<TableItem align="left" colSpan={2}>
									John
								</TableItem>
								<TableItem align="center" colSpan={2}>
									6 Cross Street
								</TableItem>
								<TableItem align="left" colSpan={4}>
									admin@gmail.com
								</TableItem>
							
								<TableItem align="center" colSpan={2}>
									20.02.2023
								</TableItem>
							</TableRow>
						</TableHead>
					</Table>
				</TableContainer>
			</MainContent>
		</Container>
	);
}

export default EditUsers;
