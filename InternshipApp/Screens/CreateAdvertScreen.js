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
import DateTimePicker from '@react-native-community/datetimepicker';
import api from "../api";

const CreateAdvertScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [skills, setSkills] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [acceptText, setAcceptText] = useState("");
  const [rejectText, setRejectText] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleCreateAdvert = async () => {
    const newAdvert = {
      title,
      context,
      skills,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      location,
      acceptText,
      rejectText,
    };

    try {
      await api.post("/adverts", newAdvert);
      navigation.goBack();
    } catch (error) {
      console.error("Error creating advert:", error);
      Alert.alert("Hata", "İlan oluşturulamadı");
    }
  };

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Yeni İlan Oluştur</Text>

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
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={startDate.toISOString().split('T')[0]}
            editable={false}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
          />
        )}

        <Text style={styles.label}>Bitiş Tarihi</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <TextInput
            style={styles.input}
            value={endDate.toISOString().split('T')[0]}
            editable={false}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
          />
        )}

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
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={handleCreateAdvert}>
        <Text style={styles.fabText}>İlan Oluştur</Text>
      </TouchableOpacity>
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
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1C1678",
    width: 140,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateAdvertScreen;
