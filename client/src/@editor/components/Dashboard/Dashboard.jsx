import { Container } from '@mui/material';
import React from 'react';
import { MainContent, Header } from './StyledDashboard';

function Dashboard() {
	return (
		<Container maxWidth="lg">
			<Header>Dashboard</Header>
			<MainContent></MainContent>
		</Container>
	);
}

export default Dashboard;
