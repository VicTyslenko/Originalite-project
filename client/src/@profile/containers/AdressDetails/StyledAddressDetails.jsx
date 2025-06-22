import styled from "styled-components";

export const Title = styled.h1`
	margin: 0 0 40px 0;
	font-size: 13px;
	text-align: center;
	text-transform: uppercase;
`;

export const ContentForm = styled.div`
	max-width: 500px;
	margin-top: 5rem;
	margin-bottom: 5rem;

	& .server-error {
		color: red;
		font-size: 13px;
	}
`;

export const ButtonWrapp = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
