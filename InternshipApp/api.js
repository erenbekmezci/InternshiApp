import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URL } from "@env";

const api = axios.create({
  baseURL: `${SERVER_URL}`, // Backend sunucunuzun URL'sini burada belirtin
});

api.interceptors.request.use(
  async (config) => {
    console.log("config", config.url);
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);

    if (token) {
      console.log("yara");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("yarrrrra");

    return Promise.reject(error);
  }
);

export default api;
