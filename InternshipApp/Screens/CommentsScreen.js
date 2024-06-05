import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import api from "../api"; // Backend API için axios veya benzeri bir kütüphane kullanın

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const fetchComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, {
        text: commentText,
      });
      setComments([...comments, response.data]);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      <TextInput
        style={styles.input}
        placeholder="Yorumunuzu yazın"
        value={commentText}
        onChangeText={setCommentText}
      />
      <Button title="Yorum Yap" onPress={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6F5F2",
  },
  comment: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default CommentsScreen;
