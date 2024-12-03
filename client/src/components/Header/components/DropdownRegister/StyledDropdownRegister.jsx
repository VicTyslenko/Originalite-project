import styled from 'styled-components';
import AnimateHeight from 'react-animate-height';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';

export const WrappAnimate = styled(AnimateHeight)`
	position: absolute;
	top: 90px;
	right: 100px;
	z-index: 3;
	background-color: #fff;
	width: 400px;
	border-radius: 4px;
	box-shadow: 0 0 10px #a1a0a0;
`;

export const BoxWrapp = styled.div`
	padding: 40px 10px;

	& .error-message {
		font-size: 14px;
		color: #d32f2f;
		border-bottom: 1px solid #d32f2f;
		display: inline-block;
		font-weight: 600;
	}
`;

export const Header = styled.div`
	text-align: center;
	position: relative;
	margin: 10px 0;

	&:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		z-index: 1;
		height: 1px;
		width: 100%;
		background-color: #949c9e;
	}

	& .details {
		display: inline-block;
		padding: 0 20px;
		color: #949c9e;
		font-weight: 400;
		position: relative;
		z-index: 2;
		background-color: #fff;
	}
`;

export const InputsWrapp = styled.div`
	margin: 20px 0;
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

export const LinkItem = styled(Link)`
	display: inline-block;
	padding-top: 4px;
	padding-left: 6px;
	text-decoration: none;
	font-family: 'Josefin Sans';
	font-weight: 400;
	font-size: 16px;
	color: #00a1ef;
	cursor: pointer;
	line-height: 1;

	/* &:hover {
		border-bottom: 1px solid #00a1ef;
	} */
`;
