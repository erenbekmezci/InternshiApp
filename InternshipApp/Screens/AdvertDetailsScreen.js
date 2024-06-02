import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api";

const AdvertDetailsScreen = ({ route }) => {
  const { advertId } = route.params;
  const navigation = useNavigation();
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        const [advertResponse, applicationsResponse] = await Promise.all([
          api.get(`/adverts/${advertId}`),
          api.get("/applications/myapp"),
        ]);

        setAdvert(advertResponse.data);

        const userApplications = applicationsResponse.data;
        const applied = userApplications.some(
          (application) => application.advertId === advertId
        );

        setHasApplied(applied);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvert();
  }, [advertId]);

  const handleApply = async () => {
    try {
      await api.post(`/adverts/apply/${advertId}`);
      Alert.alert("Success", "Application successful");
      setHasApplied(true); // Update the state to reflect the application
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      Alert.alert("Error", error.response.data.message || "An error occurred");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C1678" />
      </View>
    );
  }

  if (!advert) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>No advert found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.companyName}>{advert.companyId.username}</Text>
          <Text style={styles.adTitle}>{advert.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsContent}>{advert.context}</Text>
            <Text style={styles.detailsTitle}>Skills Required:</Text>
            <Text style={styles.detailsContent}>{advert.skills}</Text>
            <Text style={styles.detailsTitle}>Location:</Text>
            <Text style={styles.detailsContent}>{advert.location}</Text>
            <Text style={styles.detailsTitle}>Start Date:</Text>
            <Text style={styles.detailsContent}>
              {new Date(advert.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.detailsTitle}>End Date:</Text>
            <Text style={styles.detailsContent}>
              {new Date(advert.endDate).toLocaleDateString()}
            </Text>
          </View>
          {hasApplied ? (
            <Text style={styles.appliedText}>Bu ilana başvurdunuz</Text>
          ) : (
            <Button title="Başvur" onPress={handleApply} color="#1C1678" />
          )}
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1678",
    textAlign: "center",
    marginBottom: 20,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
    marginTop: 10,
  },
  detailsContent: {
    fontSize: 16,
    color: "#1C1678",
    marginBottom: 10,
    lineHeight: 24,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  appliedText: {
    fontSize: 18,
    color: "#1C1678",
    textAlign: "center",
    marginTop: 20,
  },
});

export default AdvertDetailsScreen;
