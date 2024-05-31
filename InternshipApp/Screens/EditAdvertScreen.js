// Screens/EditAdvertScreen.js

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import api from "../api";

const EditAdvertScreen = ({ route, navigation }) => {
  const { advert } = route.params;

  const [title, setTitle] = useState(advert.title);
  const [context, setContext] = useState(advert.context);
  const [skills, setSkills] = useState(advert.skills);
  const [startDate, setStartDate] = useState(advert.startDate);
  const [endDate, setEndDate] = useState(advert.endDate);
  const [location, setLocation] = useState(advert.location);
  const [acceptText, setAcceptText] = useState(advert.acceptText);
  const [rejectText, setRejectText] = useState(advert.rejectText);

  const handleUpdateAdvert = async () => {
    try {
      const response = await api.put(`/adverts/${advert._id}`, {
        title,
        context,
        skills,
        startDate,
        endDate,
        location,
        acceptText,
        rejectText,
      });

      const updatedAdvert = response.data;
      navigation.navigate("CAdvertDetailsScreen", {
        advertId: updatedAdvert._id,
      });
      Alert.alert("Success", "Advert updated successfully");
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating advert");
    }
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>İlanı Düzenle</Text>

        <Text style={styles.label}>İlan Başlığı</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="İlan Başlığı"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>İlan İçeriği</Text>
        <TextInput
          style={styles.input}
          value={context}
          onChangeText={setContext}
          placeholder="İlan İçeriği"
          placeholderTextColor="#999"
          multiline
        />

        <Text style={styles.label}>Beceriler</Text>
        <TextInput
          style={styles.input}
          value={skills}
          onChangeText={setSkills}
          placeholder="Beceriler"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Başlangıç Tarihi</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={setStartDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Bitiş Tarihi</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={setEndDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Konum</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Konum"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Kabul Mesajı</Text>
        <TextInput
          style={styles.input}
          value={acceptText}
          onChangeText={setAcceptText}
          placeholder="Kabul Mesajı"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Reddetme Mesajı</Text>
        <TextInput
          style={styles.input}
          value={rejectText}
          onChangeText={setRejectText}
          placeholder="Reddetme Mesajı"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateAdvert}>
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Buton için boşluk bırakmak için
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1678",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#1C1678",
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1C1678",
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

export default EditAdvertScreen;
