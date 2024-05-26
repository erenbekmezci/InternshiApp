import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; // İkonlar için FontAwesome kullanımı
import advertsData from "../data/Adverts.json";

const CAdvertsScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('CAdvertDetailsScreen', { advertId: item.id })}  
      style={styles.adContainer}>
      <Text style={styles.adTitle}>{item.title}</Text>
      <View style={styles.applicationCountContainer}>
        <FontAwesome name="users" size={16} color="#1C1678" />
        <Text style={styles.applicationCountText}>{item.applicationCount} Başvuru</Text>
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
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('CreateAdvertScreen')}
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
    backgroundColor: '#F6F5F2',
  },
  adContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1678',
    marginBottom: 10,
  },
  applicationCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  applicationCountText: {
    fontSize: 16,
    color: '#1C1678',
    marginLeft: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1C1678',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});

export default CAdvertsScreen;
