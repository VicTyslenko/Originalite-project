import styled from 'styled-components';
import { Button } from '@mui/material';

export const ModalWrapWindow = styled.div`
	min-height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;

	opacity: 0;
	animation: ani 0.8s forwards;

	@keyframes ani {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
`;

export const ModalContent = styled.div`
	margin: 40px 0 40px 0;
	z-index: 1;
	height: 100%;
	font-style: normal;
	background-color: #fff;
	width: 400px;
	border-radius: 8px;
	transform: scale(1);
	transition: 0.5s;
	box-shadow: 0 0 12px #000000;
`;

export const Header = styled.header`
	text-align: left;
	padding: 15px 30px;
	position: relative;
	letter-spacing: 1px;
	word-spacing: 1px;
	font-size: 22px;
	font-weight: 700;
	border-bottom: 1px solid #d7d5d5;
	display: flex;
	align-items: center;
	color: #181818;
`;

export const MainContent = styled.div`
	color: #000;
	font-size: 15px;
	line-height: 1.3;
	padding: 14px 26px;
	letter-spacing: 1px;
`;

export const CloseIcon = styled.span`
	position: absolute;
	right: 11px;
	top: 12px;
	width: 32px;
	height: 32px;
	cursor: pointer;
`;

export const ButtonModalsWrap = styled.div`
	display: flex;
	justify-content: space-around;
	padding: 12px;
	border-top: 1px solid #d7d5d5;
`;

export const ButtonItem = styled(Button)``;
