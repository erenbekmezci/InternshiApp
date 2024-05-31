import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api";

const AdvertsScreen = () => {
  const navigation = useNavigation();
  const [adverts, setAdverts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertsAndApplications = async () => {
      try {
        const [advertsResponse, applicationsResponse] = await Promise.all([
          api.get("/adverts/all/5"),
          api.get("/applications/myapp"), // Endpoint to fetch user applications
        ]);
        setAdverts(advertsResponse.data);
        setApplications(applicationsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Could not fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertsAndApplications();
  }, []);

  const hasApplied = (advertId) => {
    return applications.some((app) => app.advertId === advertId);
  };

  const renderItem = ({ item }) => {
    const applied = hasApplied(item._id);
    return (
      <TouchableOpacity
        style={[styles.adContainer, applied && styles.appliedAdContainer]}
        onPress={() =>
          navigation.navigate("AdvertDetailsScreen", { advertId: item._id })
        }
      >
        <Image
          source={{
            uri: `data:image/jpeg;base64,${item.companyId.profilePicture}`,
          }}
          style={styles.profilePic}
        />
        <View style={styles.adInfo}>
          <Text style={styles.companyName}>{item.companyId.username}</Text>
          <Text style={styles.position}>{item.title}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.endDate}>
            Son Başvuru Tarihi: {new Date(item.endDate).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1C1678" />
      ) : (
        <FlatList
          data={adverts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
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
  adContainer: {
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
  appliedAdContainer: {
    backgroundColor: "#d3ffd3", // Light green background for applied adverts
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  adInfo: {
    flex: 1,
    justifyContent: "center",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
  },
  position: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  endDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});

export default AdvertsScreen;
