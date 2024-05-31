import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import api from "../api";

const CAdvertsScreen = () => {
  const navigation = useNavigation();
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdverts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/adverts");
      setAdverts(response.data);
    } catch (error) {
      console.error("Error fetching adverts:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAdverts();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      "İlanı Kaldır",
      "Bu ilanı kaldırmak istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: async () => {
            try {
              await api.delete(`/adverts/${id}`);
              fetchAdverts();
            } catch (error) {
              console.error("Error deleting advert:", error);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C1678" />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.adContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CAdvertDetailsScreen", { advertId: item._id })
        }
        style={styles.adContent}
      >
        <Text style={styles.adTitle}>{item.title}</Text>
        <View style={styles.applicationCountContainer}>
          <FontAwesome name="users" size={16} color="#1C1678" />
          <Text style={styles.applicationCountText}>
            {item.applicationCount} Başvuru
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteIcon}
        onPress={() => handleDelete(item._id)}
      >
        <FontAwesome name="trash" size={24} color="#E74C3C" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={adverts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreateAdvertScreen")}
      >
        <FontAwesome name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#F6F5F2",
  },
  adContainer: {
    backgroundColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    position: "relative",
  },
  adContent: {
    flex: 1,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1C1678",
    marginBottom: 10,
  },
  applicationCountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  applicationCountText: {
    fontSize: 16,
    color: "#1C1678",
    marginLeft: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#1C1678",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CAdvertsScreen;
