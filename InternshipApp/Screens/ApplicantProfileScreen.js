import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import api from "../api";

const ApplicantProfileScreen = ({ route, navigation }) => {
  const { applicantId, applicationId } = route.params;
  const [applicant, setApplicant] = useState(null);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicantProfile = async () => {
      try {
        const response = await api.get(
          `/applications/profile/${applicantId}/${applicationId}`
        );
        setApplicant(response.data.applicant);
        setApplication(response.data.application);
      } catch (error) {
        console.error("Error fetching applicant profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantProfile();
  }, [applicantId, applicationId]);

  const handleUpdateStatus = async (status) => {
    try {
      const response = await api.put(`/applications/status/${applicationId}`, {
        status,
      });
      setApplication(response.data);
      Alert.alert("Success", `Application ${status}`);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating application status:", error);
      Alert.alert("Error", "Failed to update application status");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1C1678" />
        </View>
      </SafeAreaView>
    );
  }

  if (!applicant || !application) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>No applicant or application found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${applicant.photo}` }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{applicant.username}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Email: {applicant.email}</Text>
            <Text style={styles.contactText}>Phone: {applicant.phone}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Resume</Text>
            <Text style={styles.detailsContent}>{applicant.resume}</Text>
            <Text style={styles.detailsTitle}>Education</Text>
            <Text style={styles.detailsContent}>{applicant.education}</Text>
            <Text style={styles.detailsTitle}>Application Status</Text>
            <Text style={styles.detailsContent}>{application.status}</Text>
            <Text style={styles.detailsTitle}>Application Date</Text>
            <Text style={styles.detailsContent}>
              {new Date(application.createdAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleUpdateStatus("accepted")}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => handleUpdateStatus("rejected")}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicantProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  container: {
    flex: 1,
  },
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1678",
    textAlign: "center",
    marginBottom: 20,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    backgroundColor: "#1C1678",
    color: "#F6F5F2",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
    marginBottom: 10,
  },
  detailsContent: {
    fontSize: 16,
    color: "#333",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  button: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#1C1678",
  },
  rejectButton: {
    backgroundColor: "#8B0000",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
