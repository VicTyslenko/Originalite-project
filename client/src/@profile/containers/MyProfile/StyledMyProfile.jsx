import styled from 'styled-components';

export const ContainerWrapp = styled.div`
	display: flex;
	justify-content: center;
	color: #000;
	font-size: 15px;
	line-height: 1.3;
	padding: 14px 26px;
	letter-spacing: 1px;
`;

export const Title = styled.h3`
	margin: 0;
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	font-weight: 700;
	font-size: 22px;
	line-height: 33px;
	text-transform: uppercase;
	padding-top: 50px;
	padding-left: 80px;
`;

export const Type = styled.h1`
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	font-weight: 700;
	font-size: 12px;
`;

export const ContentForm = styled.div`
	margin: 20px 0 40px 0;
	z-index: 1;
	height: 100%;
	font-style: normal;
	background-color: #fff;
	width: 900px;
	border-radius: 3px;
	transform: scale(1);
	transition: 0.5s;
	/* border: 1px solid #c7c6c6; */
`;

export const Form = styled.form`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 60px;
	margin-bottom: 40px;
`;
