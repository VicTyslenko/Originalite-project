import { useEffect } from 'react';
import { Container } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { ContainerWrapper, ContentWrapp } from './StyledAdminDashboard';
import EditorRoutes from '../../router';

export function AdminDashboard() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<ContainerWrapper>
			<Container maxWidth="lg">
				<ContentWrapp>
					<Sidebar />
					<EditorRoutes />
				</ContentWrapp>
			</Container>
		</ContainerWrapper>
	);
}

export default AdminDashboard;
