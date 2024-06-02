import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import api from "../api";

const CAdvertDetailsScreen = ({ route, navigation }) => {
  const { advertId } = route.params;
  const [advert, setAdvert] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchAdvert = async () => {
    try {
      const response = await api.get(`/adverts/${advertId}`);
      setAdvert(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching advert:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAdvert();
    }, [advertId])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!advert) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>No advert found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleViewApplications = () => {
    navigation.navigate("CApplicationsScreen", { advertId: advert._id });
  };

  const handleEditAdvert = () => {
    navigation.navigate("EditAdvertScreen", { advert });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.adTitle}>{advert.title}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsContent}>{advert.context}</Text>
            <Text style={styles.detailsTitle}>Skills Required:</Text>
            <Text style={styles.detailsContent}>{advert.skills}</Text>
            <Text style={styles.detailsTitle}>Location:</Text>
            <Text style={styles.detailsContent}>{advert.location}</Text>
            <Text style={styles.detailsTitle}>Start Date:</Text>
            <Text style={styles.detailsContent}>{advert.startDate}</Text>
            <Text style={styles.detailsTitle}>End Date:</Text>
            <Text style={styles.detailsContent}>{advert.endDate}</Text>
          </View>
          <View style={styles.applicationCountContainer}>
            <FontAwesome name="users" size={16} color="#1C1678" />
            <Text style={styles.applicationCountText}>
              {advert.applicationCount} Başvuru
            </Text>
          </View>
          <Button
            title="Başvuruları görüntüle"
            onPress={handleViewApplications}
            color="#1C1678"
          />
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditAdvert}
          >
            <FontAwesome name="edit" size={24} color="#1C1678" />
            <Text style={styles.editButtonText}>Düzenle</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  adTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1678",
    textAlign: "center",
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
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
  applicationCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  applicationCountText: {
    fontSize: 16,
    color: "#1C1678",
    marginLeft: 5,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F5F2",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  editButtonText: {
    color: "#1C1678",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default CAdvertDetailsScreen;
