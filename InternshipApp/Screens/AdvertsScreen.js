import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import advertsData from "../data/Adverts.json";

const AdvertsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.adContainer}
      onPress={() => navigation.navigate('AdvertDetailsScreen', { advertId: item.id })}
    >
      <Image source={{ uri: `data:image/jpeg;base64,${item.profilePicture}` }} style={styles.profilePic} />
      <View style={styles.adInfo}>
        <Text style={styles.companyName}>{item.username}</Text>
        <Text style={styles.position}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.endDate}>Son Başvuru Tarihi: {item.endDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={advertsData.adverts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },
  adContainer: {
    flexDirection: 'row',
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
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
  adInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1678',
  },
  position: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  endDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
});

export default AdvertsScreen;
