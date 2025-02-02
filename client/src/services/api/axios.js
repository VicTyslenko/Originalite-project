import axios from "axios";

const API_URI =
	process.env.NODE_ENV === "production" ? "https://originalite.onrender.com/api" : "http://localhost:4444/api";

 const instance = axios.create({
	baseURL: API_URI,
	timeout: 3000,
	withCredentials: false,
});

export default instance;
