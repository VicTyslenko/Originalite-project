import styled from 'styled-components';
import { TextField, Box } from '@mui/material';

export const ContainerWrapp = styled.div`
	display: flex;
	justify-content: center;
	color: #000;
	font-size: 15px;
	line-height: 1.3;
	padding: 14px 26px;
	letter-spacing: 1px;
`;

export const ContentForm = styled.div`
	margin: 40px 0 40px 0;
	z-index: 1;
	height: 100%;
	font-style: normal;
	background-color: #fff;
	width: 430px;
	border-radius: 3px;
	transform: scale(1);
	transition: 0.5s;
`;

export const MainContent = styled.div`
	display: flex;
	justify-content: center;

	& .form {
		width: 100%;
		padding: 24px;
	}
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

export const ButtonWrap = styled.div`
	margin-top: 10px;
	display: flex;
	justify-content: space-around;
	padding: 30px 0;
	border-top: 1px solid #d7d5d5;
`;

export const ModalBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	box-shadow: 24;
	padding: 4;
	border-radius: 6px;
`;

export const ModalContent = styled.div`
	font-size: 26px;
	padding: 16px 20px;
	width: 400px;
	text-align: center;
	font-family: 'Josefin Sans';
`;

export const InputItem = styled(TextField)`
	&&& {
		width: 100%;
		color: #949c9e;
		margin-bottom: 20px;
	}
`;

export const AddInput = styled.div`
	display: inline-block;
	cursor: pointer;
	padding-bottom: 7px;
`;
