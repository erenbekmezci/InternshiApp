import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: `http://10.0.0.34:3000`, // Backend sunucunuzun URL'sini burada belirtin
});

api.interceptors.request.use(
  async (config) => {
    console.log("config", api.getUri());
    const token = await AsyncStorage.getItem("token");
    console.log("token", token);

    if (token) {
      console.log("yara");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
