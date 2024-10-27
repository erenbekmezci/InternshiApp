import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  Button,
} from "react-native";
import api from "../api";
import { URL } from "@env";

const defaultProfilePic = `http://${URL}:3000/uploads/default_profile.jpg`;

const ApplicationDetailsScreen = ({ route }) => {
  const { applicationId } = route.params;
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await api.get(`/applications/${applicationId}`);
        setApplication(response.data);
      } catch (error) {
        console.error("Error fetching application details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetails();
  }, [applicationId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1C1678" />
        </View>
      </SafeAreaView>
    );
  }

  if (!application) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>No application found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { advertId: advert } = application;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Image
            source={{
              uri: advert.companyId.photo
                ? `http://${URL}:3000/uploads/${advert.companyId.photo}`
                : defaultProfilePic,
            }}
            style={styles.profilePic}
          />
          <Text style={styles.companyName}>{advert.companyId.username}</Text>
          <Text style={styles.adTitle}>{advert.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsContent}>{advert.context}</Text>
            <Text style={styles.detailsTitle}>Gerekli Beceriler:</Text>
            <Text style={styles.detailsContent}>{advert.skills}</Text>
            <Text style={styles.detailsTitle}>Konum:</Text>
            <Text style={styles.detailsContent}>{advert.location}</Text>
            <Text style={styles.detailsTitle}>Başlangıç Tarihi:</Text>
            <Text style={styles.detailsContent}>
              {new Date(advert.startDate).toLocaleDateString()}
            </Text>
            <Text style={styles.detailsTitle}>Bitiş Tarihi:</Text>
            <Text style={styles.detailsContent}>
              {new Date(advert.endDate).toLocaleDateString()}
            </Text>
            <Text style={styles.detailsTitle}>Başvuru Tarihi:</Text>
            <Text style={styles.detailsContent}>
              {new Date(application.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.detailsTitle}>Durumu:</Text>
            <Text style={styles.detailsContent}>{application.status}</Text>
          </View>
          {application.status === "accepted" && (
            <Text style={styles.acceptText}>{advert.acceptText}</Text>
          )}
          {application.status === "rejected" && (
            <Text style={styles.rejectText}>{advert.rejectText}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationDetailsScreen;

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
    alignItems: "center",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  adTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1678",
    textAlign: "center",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
    textAlign: "center",
    marginBottom: 10,
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
  acceptText: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  rejectText: {
    fontSize: 18,
    color: "#F44336",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#FFEBEE",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
