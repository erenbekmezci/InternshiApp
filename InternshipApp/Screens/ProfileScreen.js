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
} from "react-native";
import api from "../api"; // axios istemcisini burada kullanıyoruz
import { AuthContext } from "../src/context/AuthContext";

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users`);
        setUserInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/users`, userInfo);
      setUserInfo(response.data);
      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating profile");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${userInfo.photo}`,
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
              <Button title="Save" onPress={handleUpdate} />
              <Button title="Cancel" onPress={() => setIsEditing(false)} />
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

export default ProfileScreen;
