import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../api"; // Backend API için axios veya benzeri bir kütüphane kullanın

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [newPostAlert, setNewPostAlert] = useState(false);
  const ws = useRef(null);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");

      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();

    ws.current = new WebSocket("ws://10.0.0.34:8080"); // WebSocket sunucusunun adresi

    ws.current.onmessage = (event) => {
      const newPost = JSON.parse(event.data);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNewPostAlert(true);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="heart" size={20} color="#FF0000" />
          <Text style={styles.actionText}>Beğen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("Comments", { postId: item._id })}
        >
          <Icon name="comment" size={20} color="#1C1678" />
          <Text style={styles.actionText}>Yorum Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleScroll = () => {
    setNewPostAlert(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.title}-${Math.random()}`} // Benzersiz key üretimi
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("CreatePost")}
      >
        <Icon name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      {newPostAlert && (
        <TouchableOpacity
          style={styles.newPostAlert}
          onPress={() => setNewPostAlert(false)}
        >
          <Text style={styles.newPostAlertText}>
            Yeni bir gönderi var! Görmek için kaydırın.
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
  },
  list: {
    marginTop: 30,
    paddingBottom: 100,
  },
  postContainer: {
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#1C1678",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    color: "#1C1678",
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    color: "#1C1678",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: "#1C1678",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  newPostAlert: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    backgroundColor: "#1C1678",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  newPostAlertText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default HomeScreen;
