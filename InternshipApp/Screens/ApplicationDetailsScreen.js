import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import api from "../api";

const ApplicationDetailsScreen = ({ route }) => {
  const { applicationId, advertId } = route.params;
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
        <View style={styles.container}>
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
          <Text style={styles.adTitle}>{advert.title}</Text>
          <Text style={styles.companyName}>{advert.companyId.username}</Text>
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
          <Text style={styles.detailsTitle}>Application Date:</Text>
          <Text style={styles.detailsContent}>
            {new Date(application.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.detailsTitle}>Status:</Text>
          <Text style={styles.detailsContent}>{application.status}</Text>
        </View>
        <View style={styles.statusContainer}>
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
    backgroundColor: "#F6F5F2",
  },
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingHorizontal: 20,
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
  statusContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  acceptText: {
    fontSize: 18,
    color: "#4CAF50",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#E8F5E9",
    padding: 15,
    borderRadius: 10,
  },
  rejectText: {
    fontSize: 18,
    color: "#F44336",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#FFEBEE",
    padding: 15,
    borderRadius: 10,
  },
});
