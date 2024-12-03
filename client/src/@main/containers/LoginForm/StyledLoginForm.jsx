import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

export const ContainerWrapper = styled.div`
	background: black;
`;
export const HeadWrapp = styled.div`
	padding-top: 160px;

	& .list-item {
		font-weight: 400;
		font-size: 18px;
		line-height: 18px;
		font-family: 'Josefin Sans';
		color: #e5e5e5;
	}
	& .login {
		margin-right: 50px;
	}
	& .registration {
		margin-left: 50px;
	}
`;

export const CssTextField = styled(TextField)({
	input: {
		color: 'white',
	},
	width: '100%',
	'& label.Mui-focused': {
		color: 'white',
	},

	'& .MuiInput-underline:after': {
		borderBottomColor: 'white',
	},
	'& .MuiInput-underline:before': { borderBottomColor: 'white' },
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'red',
		},
		'&:hover textfield': {
			borderColor: 'white',
		},
		'& .MuiInput-root': {
			color: 'white',
		},
	},
});

export const LoginWrapper = styled.div`
	width: 467px;
	margin-top: 70px;
	margin-bottom: 162px;
`;

export const ButtonWrapp = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 107px;
`;
export const StyledButton = styled(Button)`
	&&& {
		background: #e5e5e5;
		color: #000000;
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		font-family: 'Open Sans', sans-serif;
	}
`;

export const Description = styled.h2`
	color: white;
	font-weight: 400;
	font-size: 16px;
	line-height: 16px;
	margin-top: 73px;
	font-family: 'Josefin Sans', sans-serif;
	display: flex;
	justify-content: center;
`;
export const InputsWrapp = styled.div`
	margin-top: 71px;
	display: flex;
	flex-direction: column;
	gap: 44px;
`;
export const CheckBoxWrapp = styled.div`
	margin-top: 55px;
	margin-left: -8px;
	display: flex;
	gap: 15px;
	& .box-text {
		color: #847a7a;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
	}
`;

export const LoginWrapperReg = styled.div`
	width: 467px;
	margin-top: 70px;
	margin-bottom: 162px;
	& .message {
		font-size: 14px;
		color: #d32f2f;
		border-bottom: 1px solid #d32f2f;
		font-weight: 600;
		margin-top:30px ;
	}
	& .flex-error {
		display: flex;
		justify-content: center;
	}
`;

export const ButtonWrappReg = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 107px;
`;
export const StyledButtonReg = styled(Button)`
	&&& {
		background: #e5e5e5;
		color: #000000;
		font-weight: 400;
		font-size: 18px;
		line-height: 25px;
		font-family: 'Open Sans', sans-serif;
	}
`;


export const InputsWrappReg = styled.div`
	margin-top: 71px;
	display: flex;
	flex-direction: column;
	gap: 34px;
	& .label-text {
		color: #e5e5e5;
		font-weight: 700;
		font-size: 12px;
		line-height: 16px;
		font-family: 'Open Sans';
		text-transform: uppercase;
	}
`;
