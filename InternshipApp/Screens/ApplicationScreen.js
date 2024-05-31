import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import api from "../api";

const ApplicationsScreen = ({ navigation }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications/user");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        Alert.alert(
          "Error",
          "Could not fetch applications. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.applicationContainer}
      onPress={() =>
        navigation.navigate("ApplicationDetailsScreen", {
          applicationId: item.id,
          advertId: item.advert._id,
        })
      }
    >
      <View style={styles.adInfo}>
        <Text style={styles.adTitle}>{item.advert.title}</Text>
        <Text style={styles.companyName}>{item.advert.companyId.username}</Text>
        <Text style={styles.location}>{item.advert.location}</Text>
      </View>
      <View style={styles.iconContainer}>
        {item.status === "pending" && (
          <FontAwesome name="hourglass-half" size={24} color="#1C1678" />
        )}
        {item.status === "accepted" && (
          <FontAwesome name="check" size={24} color="#1C1678" />
        )}
        {item.status === "rejected" && (
          <FontAwesome name="times" size={24} color="#1C1678" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1C1678" />
      ) : (
        <FlatList
          data={applications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  applicationContainer: {
    flexDirection: "row",
    padding: 15,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  adInfo: {
    flex: 1,
    justifyContent: "center",
  },
  adTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
  },
  companyName: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ApplicationsScreen;
