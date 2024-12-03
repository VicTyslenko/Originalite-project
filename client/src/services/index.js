const API_URI = "http://localhost:5000/api";

const sendRequest = async (url) => {
	const response = await fetch(API_URI + url);
	const result = await response.json();
	return result;
};

export default sendRequest;
