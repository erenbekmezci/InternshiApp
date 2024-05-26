import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // İkonlar için FontAwesome kullanımı
import applicationsData from "../data/Applications.json";
import advertsData from "../data/Adverts.json";
import usersData from "../data/users.json";

const ApplicationsScreen = ({ navigation }) => {
  // Kullanıcı ID'sini alıyoruz, burada sabit olarak 1 kabul ettim, gerçek uygulamada giriş yapan kullanıcıdan alınmalı
  const userId = 1;
  
  // Kullanıcının başvurmuş olduğu ilanlar
  const userApplications = applicationsData.applications.filter(app => app.userId === userId);

  // Başvurduğu ilan bilgilerini userApplications'a ekliyoruz
  const applicationsWithAdverts = userApplications.map(app => {
    const advert = advertsData.adverts.find(ad => ad.id === app.advertId);
    return { ...app, advert };
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.applicationContainer}
      onPress={() => navigation.navigate('ApplicationDetailsScreen', { applicationId: item.id, advertId: item.advertId })}
    >
      <View style={styles.adInfo}>
        <Text style={styles.adTitle}>{item.advert.title}</Text>
        <Text style={styles.companyName}>{item.advert.username}</Text>
        <Text style={styles.location}>{item.advert.location}</Text>
      </View>
      <View style={styles.iconContainer}>
        {item.status === 'waiting' && <FontAwesome name="hourglass-half" size={24} color="#1C1678" />}
        {item.status === 'accepted' && <FontAwesome name="check" size={24} color="#1C1678" />}
        {item.status === 'rejected' && <FontAwesome name="times" size={24} color="#1C1678" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={applicationsWithAdverts}
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
  applicationContainer: {
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
  adInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1678',
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ApplicationsScreen;
