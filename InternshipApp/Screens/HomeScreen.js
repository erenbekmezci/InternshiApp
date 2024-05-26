import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure this library is installed

const HomeScreen = ({navigation}) => {
  const posts = [
    {
      id: 1,
      username: "user1",
      profilePicture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwc...",
      title: "Güzel Bir Gün",
      postImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwc..."
    },
    {
      id: 2,
      username: "user2",
      profilePicture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwc...",
      title: "Harika Manzara",
      postImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwc..."
    },
    {
      id: 3,
      username: "user3",
      profilePicture: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwc...",
      title: "Yeni Başlangıçlar",
      postImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwc..."
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={{ uri: item.profilePicture }} style={styles.profilePic} />
        <Text style={styles.username}>{item.username}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{ uri: item.postImage }} style={styles.postImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Post')}
      >
        <Icon name="plus" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },
  list: {
    marginTop:30,
    paddingBottom: 100, // extra padding to ensure content is visible above the FAB
  },
  postContainer: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1678',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 2,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    color: '#F6F5F2',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    color: '#1C1678',
    padding: 10,
    backgroundColor: '#F6F5F2',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    backgroundColor: '#1C1678',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

export default HomeScreen;
