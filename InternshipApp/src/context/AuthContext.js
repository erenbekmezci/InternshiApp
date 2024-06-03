import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get(`/auth/verifyToken`);
          if (response.status === 200) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          setUser(null);
        }
      }
    };
    checkToken();
  }, []);

  const login = async (email, password) => {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    if (response.status === 200) {
      const { token, userId, role } = response.data;
      await AsyncStorage.setItem("token", token);
      setUser({ id: userId, role });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
