import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import api from "../api";

const CSignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

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

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError("E-posta gereklidir");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Geçerli bir e-posta adresi girin");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Şifre gereklidir");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Şifre en az 6 karakter olmalıdır");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!username) {
      setUsernameError("Kullanıcı adı gereklidir");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!phone) {
      setPhoneError("Telefon numarası gereklidir");
      valid = false;
    } else {
      setPhoneError("");
    }

    if (!companyName) {
      setCompanyNameError("Firma adı gereklidir");
      valid = false;
    } else {
      setCompanyNameError("");
    }

    return valid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post(`/auth/register`, {
        email,
        password,
        username,
        role: "company",
        phone,
        companyName,
        expoPushToken,
      });

      if (response.status === 201) {
        Alert.alert("Başarılı", "Başarıyla kayıt olundu!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Başarısız", response.data.message || "Kayıt başarısız oldu");
      }
    } catch (error) {
      Alert.alert("Hata", "Bir şeyler yanlış gitti");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Kurumsal Hesap Oluştur</Text>

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#999"
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Telefon Numarası"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Firma adı"
          value={companyName}
          onChangeText={setCompanyName}
          multiline
          placeholderTextColor="#999"
        />
        {companyNameError ? <Text style={styles.errorText}>{companyNameError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Hesap Oluştur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1678",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    width: "100%",
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1C1678",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CSignUp;
