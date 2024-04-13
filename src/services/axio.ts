import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://192.168.0.12:3000",
});

export default axios;
