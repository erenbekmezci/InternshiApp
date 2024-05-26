import React from 'react';
import { SafeAreaView, View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const CProfileScreen = () => {
  const userInfo = {
    username: "TechCorp",
    email: "contact@techcorp.com",
    phone: "123-456-7890",
    profilePicture: "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
    resume: "Leading software development company specializing in innovative solutions.",
    location: "San Francisco, CA"
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${userInfo.profilePicture}` }}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userInfo.username}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Email: {userInfo.email}</Text>
            <Text style={styles.contactText}>Phone: {userInfo.phone}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Company Description</Text>
            <Text style={styles.detailsContent}>{userInfo.resume}</Text>
            <Text style={styles.detailsTitle}>Location</Text>
            <Text style={styles.detailsContent}>{userInfo.location}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },
  container: {
    flex: 1,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1678',
    textAlign: 'center',
    marginBottom: 20,
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactText: {
    fontSize: 16,
    backgroundColor: '#1C1678',
    color: '#F6F5F2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1678',
    marginBottom: 10,
  },
  detailsContent: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
});

export default CProfileScreen;
