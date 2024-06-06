import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../api"; // Backend API için axios veya benzeri bir kütüphane kullanın

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newPostAlert, setNewPostAlert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [likedBy, setLikedBy] = useState([]);
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const ws = useRef(null);

  const fetchPosts = async () => {
    try {
      setRefreshing(true);
      const response = await api.get("/posts");
      setPosts(response.data);
      setRefreshing(false);
    } catch (error) {
      console.error(error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    ws.current = new WebSocket("ws://10.0.0.34:8080"); // WebSocket sunucusunun adresi

    ws.current.onmessage = (event) => {
      const updatedPost = JSON.parse(event.data);
      console.log("Received WebSocket message: ", updatedPost); // Log the received message
      setPosts((prevPosts) => {
        const existingPostIndex = prevPosts.findIndex(
          (post) => post._id === updatedPost._id
        );
        if (existingPostIndex !== -1) {
          const updatedPosts = [...prevPosts];
          updatedPosts[existingPostIndex] = updatedPost;
          return updatedPosts;
        } else {
          return [updatedPost, ...prevPosts];
        }
      });
      setNewPostAlert(true);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleLikesModal = (likedBy = []) => {
    setLikedBy(likedBy || []);
    setModalVisible(true);
  };

  const handleAddComment = async (postId) => {
    try {
      await api.post(`/posts/${postId}/comments`, { comment: commentText });
      setCommentText("");
      setCommentingPostId(null);
      fetchPosts(); // Yorum eklendikten sonra postları yeniden getir
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await api.post(`/posts/${postId}/like`);
      fetchPosts(); // Beğenme işleminden sonra postları yeniden getir
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actions}>
        <View style={styles.actionLeft}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLikePost(item._id)}
          >
            <Icon name="heart" size={20} color="#FF0000" />
            <Text style={styles.actionText}>Beğen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setCommentingPostId(item._id)}
          >
            <Icon name="comment" size={20} color="#1C1678" />
            <Text style={styles.actionText}>Yorum Yap</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.likesCount}
          onPress={() => handleLikesModal(item.likes)}
        >
          <Text>{item.likes ? item.likes.length : 0} Beğeni</Text>
        </TouchableOpacity>
      </View>
      {commentingPostId === item._id && (
        <View style={styles.commentSection}>
          <TextInput
            style={styles.commentInput}
            placeholder="Yorum yap"
            value={commentText}
            onChangeText={setCommentText}
          />
          <Button title="Gönder" onPress={() => handleAddComment(item._id)} />
        </View>
      )}
      {item.comments &&
        item.comments.map((comment) => (
          <View key={comment._id} style={styles.comment}>
            <Image
              source={{
                uri: `http://10.0.0.34:3000/uploads/${
                  comment.user?.photo || "default_profile.jpg"
                }`,
              }}
              style={styles.commentUserPhoto}
            />
            <View>
              <Text style={styles.commentUsername}>
                {comment.user?.username || "Bilinmeyen Kullanıcı"}
              </Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          </View>
        ))}
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
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
        }
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
          <Text style={styles.newPostAlertText}>Yeni bir gönderi var!</Text>
        </TouchableOpacity>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Beğenenler</Text>
            <ScrollView>
              {likedBy.map((user) => (
                <View key={user._id} style={styles.likedUserContainer}>
                  <Image
                    source={{
                      uri: `http://10.0.0.34:3000/uploads/${user.photo}`,
                    }}
                    style={styles.likedUserPhoto}
                  />
                  <Text style={styles.likedUserName}>{user.username}</Text>
                </View>
              ))}
            </ScrollView>
            <Button title="Kapat" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    alignItems: "center",
    marginTop: 10,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  actionText: {
    marginLeft: 5,
    color: "#1C1678",
    fontSize: 16,
  },
  likesCount: {
    marginLeft: "auto",
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  likedUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  likedUserPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  likedUserName: {
    fontSize: 16,
    color: "#1C1678",
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentUserPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    color: "#1C1678",
    marginRight: 5,
  },
  commentText: {
    color: "#333",
  },
});

export default HomeScreen;
