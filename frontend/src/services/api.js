import axios from "axios";

const api = axios.create({
    baseURL: "https://snaplink-y2rq.onrender.com",
});
export default api;