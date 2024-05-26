import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import api from "../api"; // Axios istemcisini burada kullanıyoruz
import { AuthContext } from "../src/context/AuthContext";

const CProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [companyInfo, setCompanyInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/company/profile`);
        setCompanyInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/company/profile`, companyInfo);
      setCompanyInfo(response.data);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1C1678" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${companyInfo.photo}`,
            }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.infoContainer}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={companyInfo.username}
                onChangeText={(text) =>
                  setCompanyInfo({ ...companyInfo, username: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={companyInfo.email}
                onChangeText={(text) =>
                  setCompanyInfo({ ...companyInfo, email: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={companyInfo.phone}
                onChangeText={(text) =>
                  setCompanyInfo({ ...companyInfo, phone: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Company Description"
                value={companyInfo.companyDetails}
                onChangeText={(text) =>
                  setCompanyInfo({ ...companyInfo, companyDetails: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={companyInfo.location}
                onChangeText={(text) =>
                  setCompanyInfo({ ...companyInfo, location: text })
                }
              />
              <Button title="Save" onPress={handleUpdate} />
              <Button title="Cancel" onPress={() => setIsEditing(false)} />
            </>
          ) : (
            <>
              <Text style={styles.name}>{companyInfo.username}</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}>
                  Email: {companyInfo.email}
                </Text>
                <Text style={styles.contactText}>
                  Phone: {companyInfo.phone}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Company Description</Text>
                <Text style={styles.detailsContent}>
                  {companyInfo.companyDetails}
                </Text>
                <Text style={styles.detailsTitle}>Location</Text>
                <Text style={styles.detailsContent}>
                  {companyInfo.location}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </>
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
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePic: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ccc", // Placeholder background color
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
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
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
    backgroundColor: "#F6F5F2",
    padding: 10,
    borderRadius: 8,
  },
  detailsContent: {
    fontSize: 16,
    color: "#1C1678",
    marginBottom: 20,
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
  input: {
    fontSize: 16,
    color: "#1C1678",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: "#1C1678",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CProfileScreen;
