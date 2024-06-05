import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://10.0.0.34:3000",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPosts = () => api.get("/posts");
export const createPost = (post) => api.post("/posts", post);
export const likePost = (postId) => api.post(`/posts/${postId}/like`);
export const getComments = (postId) => api.get(`/posts/${postId}/comments`);
export const addComment = (postId, comment) =>
  api.post(`/posts/${postId}/comments`, { comment });
export const getLikes = (postId) => api.get(`/posts/${postId}/likes`);

export default api;
