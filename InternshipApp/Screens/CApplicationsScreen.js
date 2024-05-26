import React from 'react';
import { SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import applicationsData from "../data/Applications.json";
import usersData from "../data/users.json";
import { useNavigation } from '@react-navigation/native';

const CApplicationsScreen = ({ route }) => {
  const { advertId } = route.params;
  const navigation = useNavigation();

  // İlgili ilan ID'sine sahip başvuruları ve durumu "waiting" olanları filtrele
  const filteredApplications = applicationsData.applications.filter(app => app.advertId === advertId && app.status === "waiting");

  const renderItem = ({ item }) => {
    const applicant = usersData.users.find(user => user.id === item.userId);
    return (
      <TouchableOpacity 
        style={styles.applicantContainer}
        onPress={() => navigation.navigate('ApplicantProfileScreen', { applicantId: item.userId, applicationId: item.id })}
      >
        <Image source={{ uri: `data:image/jpeg;base64,${applicant.photo}` }} style={styles.profilePic} />
        <Text style={styles.applicantName}>{applicant.username}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredApplications}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default CApplicationsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  applicantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#F6F5F2',
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
  applicantName: {
    fontSize: 16,
    color: '#1C1678',
    fontWeight: 'bold',
  },
});
