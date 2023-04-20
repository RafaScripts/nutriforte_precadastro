import axios from "axios";

const api = axios.create({
  baseURL: "https://cluster-01.apigratis.com"
});

export default api;
