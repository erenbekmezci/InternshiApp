import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import api from "../api";

const CApplicationsScreen = ({ route }) => {
  const { advertId } = route.params;
  const navigation = useNavigation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchApplications = async () => {
    try {
      const response = await api.get(`/applications/advert/${advertId}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchApplications();
    }, [advertId])
  );

  const filteredApplications = applications.filter((app) => {
    if (filterStatus === "all") return true;
    return app.status === filterStatus;
  });

  const renderItem = ({ item }) => {
    const applicant = item.userId;
    return (
      <TouchableOpacity
        style={styles.applicantContainer}
        onPress={() =>
          navigation.navigate("ApplicantProfileScreen", {
            applicantId: applicant._id,
            applicationId: item._id,
          })
        }
      >
        <Image
          source={{ uri: `data:image/jpeg;base64,${applicant.photo}` }}
          style={styles.profilePic}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.applicantName}>{applicant.username}</Text>
          <Text style={styles.status}>
            <FontAwesome name="info-circle" size={14} color="#1C1678" />{" "}
            {item.status}
          </Text>
          <Text style={styles.date}>
            <FontAwesome name="calendar" size={14} color="#1C1678" />{" "}
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <FontAwesome name="chevron-right" size={24} color="#ccc" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Applications</Text>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by Status:</Text>
        <Picker
          selectedValue={filterStatus}
          style={styles.picker}
          onValueChange={(itemValue) => setFilterStatus(itemValue)}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="Accepted" value="accepted" />
          <Picker.Item label="Rejected" value="rejected" />
        </Picker>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#1C1678" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredApplications}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

export default CApplicationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#1C1678",
    padding: 15,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    elevation: 3,
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  filterLabel: {
    fontSize: 16,
    color: "#1C1678",
    marginRight: 10,
    fontWeight: "bold",
  },
  picker: {
    height: 50,
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 10,
  },
  applicantContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  applicantName: {
    fontSize: 16,
    color: "#1C1678",
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#1C1678",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});
