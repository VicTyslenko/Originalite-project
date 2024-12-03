import styled from 'styled-components';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)`
	&&& {
		background: black;
		color: white;
		
	}
`;
export const InputsWrapp = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	gap: 24px;
`;

export const InputItem = styled(TextField)`
	&&& {
		width: 100%;
		color: #949c9e;
	}
`;

export const ButtonBlock = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 56px;
`;

export const FormPages = styled.div`
	margin-top: 30px;
	display: flex;
	justify-content: center;
	font-size: 16px;
	line-height: 1;
	color: #949c9e;
	align-items: center;
`;
