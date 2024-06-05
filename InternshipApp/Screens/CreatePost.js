import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import api from "../api"; // Backend API için axios veya benzeri bir kütüphane kullanın

const CreatePostScreen = ({ navigation }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleSubmit = async () => {
    const newPost = {
      username: "currentUser", // Mevcut kullanıcının adı
      title: postTitle,
      content: postContent,
    };

    try {
      await api.post("/posts", newPost);
      navigation.navigate("Home"); // Paylaşımdan sonra anasayfaya dön
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert(
        "Error",
        "Gönderi oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Gönderi başlığını girin"
        value={postTitle}
        onChangeText={setPostTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Gönderi içeriğini girin"
        value={postContent}
        onChangeText={setPostContent}
        multiline
      />
      <Button title="Gönderi Oluştur" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6F5F2",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
});

export default CreatePostScreen;
