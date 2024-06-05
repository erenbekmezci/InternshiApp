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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../api"; // axios istemcisini burada kullanıyoruz
import { AuthContext } from "../src/context/AuthContext";

const defaultProfilePic = "http://10.0.0.34:3000/uploads/default_profile.jpg"; // Varsayılan profil resmi URL'si

const CProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [companyInfo, setCompanyInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await api.get(`/company/profile`);
        setCompanyInfo(response.data);
        if (
          response.data.photo &&
          response.data.photo !== "default_profile.jpg"
        ) {
          setImage(`http://10.0.0.34:3000/uploads/${response.data.photo}`);
        } else {
          setImage(defaultProfilePic);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompany();
  }, []);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (const key in companyInfo) {
        formData.append(key, companyInfo[key]);
      }
      if (image && image !== defaultProfilePic) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];
        formData.append("photo", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      } else {
        formData.append("photo", "default_profile.jpg"); // Varsayılan profil resmi dosya adı
      }
      const response = await api.put(`/company/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setCompanyInfo(response.data);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(defaultProfilePic);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.profilePic}
          />
          {isEditing && (
            <View style={styles.photoButtons}>
              <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                <Text style={styles.photoButtonText}>Change Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoButton}
                onPress={removeImage}
              >
                <Text style={styles.photoButtonText}>Remove Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.actionButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("Posts")}
            >
              <Text style={styles.actionButtonText}>Gönderilerim</Text>
            </TouchableOpacity>
          </View>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Company Name"
                value={companyInfo.companyName}
                onChangeText={(text) =>
                  setCompanyInfo({ ...companyInfo, companyName: text })
                }
              />
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
              <View style={styles.saveCancelButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleUpdate}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
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
            </>
          )}
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  profilePicContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profilePic: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  photoButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  photoButton: {
    backgroundColor: "#1C1678",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  photoButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: "#1C1678",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#F6F5F2",
    backgroundColor: "#1C1678",
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
    backgroundColor: "#F6F5F2",
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
  saveCancelButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#1C1678",
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#E74C3C",
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
