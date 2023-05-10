import axios from "axios";

const api = axios.create({
  baseURL: "https://cluster.apigratis.com"
});

export default api;
