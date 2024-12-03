import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

  	img{
		max-width: 100%;
		vertical-align: middle;
		height: auto;
		margin: 0;
		border: 0;
	}
`;

export default GlobalStyle;
