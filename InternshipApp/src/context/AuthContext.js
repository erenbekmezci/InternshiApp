import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/auth/verifyToken");
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

  const updatePushToken = async (userId, expoPushToken) => {
    try {
      await api.put("/auth/update-push-token", { userId, expoPushToken });
    } catch (error) {
      console.error("Error updating push token:", error);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  };

  const login = async (email, password) => {
    console.log("Login initiated");
    const response = await api.post("/auth/login", { email, password });
    if (response.status === 200) {
      const { token, userId, role } = response.data;
      await AsyncStorage.setItem("token", token);
      setUser({ id: userId, role });

      const expoPushToken = await registerForPushNotificationsAsync();
      console.log("Expo Push Token: ", expoPushToken); // Log the push token

      if (expoPushToken) {
        console.log("Token exists and is not null or undefined");
        await updatePushToken(userId, expoPushToken);
      } else {
        console.error("Failed to retrieve Expo Push Token");
      }
    } else {
      console.log("Login failed: ", response.status);
    }
  };

  const logout = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await updatePushToken(user.id, ""); // Push token'ı temizle
    }
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
