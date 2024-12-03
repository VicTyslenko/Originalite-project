import styled from 'styled-components';
import { TableCell } from '@mui/material';

export const MainContent = styled.div`
	display: flex;
	justify-content: center;
`;

export const Header = styled.h3`
	margin: 0;
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	font-weight: 700;
	font-size: 22px;
	line-height: 33px;
	text-transform: uppercase;
	padding-top: 50px;
	padding-left: 80px;
`;

export const TableCellTitle = styled(TableCell)`
	&&& {
		font-size: 18px;
		font-weight: 600;
		color: #544d4d;
	}
`;

export const TableCellName = styled(TableCell)`
	&&& {
		font-size: 15px;
		font-weight: 600;
		color: #2d2d2d;
	}
`;

export const TableItem = styled(TableCell)`
	&&& {
		font-size: 15px;
		font-weight: 500;
		color: #2d2d2d;
	}
`;
