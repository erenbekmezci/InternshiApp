// ProfileScreen.js

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
import api from "../api";
import { AuthContext } from "../src/context/AuthContext";

const defaultProfilePic = "http://10.0.0.34:3000/uploads/default_profile.jpg";

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users`);
        setUserInfo(response.data);
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

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (const key in userInfo) {
        formData.append(key, userInfo[key]);
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
        formData.append("photo", "default_profile.jpg");
      }
      const response = await api.put(`/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUserInfo(response.data);
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
              onPress={() => navigation.navigate("MyPosts")}
            >
              <Text style={styles.actionButtonText}>Gönderilerim</Text>
            </TouchableOpacity>
          </View>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={userInfo.username}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, username: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={userInfo.email}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, email: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                value={userInfo.phone}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, phone: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Resume"
                value={userInfo.resume}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, resume: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Education"
                value={userInfo.education}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, education: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={userInfo.location}
                onChangeText={(text) =>
                  setUserInfo({ ...userInfo, location: text })
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
              <Text style={styles.name}>{userInfo.username}</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactText}>Email: {userInfo.email}</Text>
                <Text style={styles.contactText}>Phone: {userInfo.phone}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Resume</Text>
                <Text style={styles.detailsContent}>{userInfo.resume}</Text>
                <Text style={styles.detailsTitle}>Education</Text>
                <Text style={styles.detailsContent}>{userInfo.education}</Text>
                <Text style={styles.detailsTitle}>Location</Text>
                <Text style={styles.detailsContent}>{userInfo.location}</Text>
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

export default ProfileScreen;
