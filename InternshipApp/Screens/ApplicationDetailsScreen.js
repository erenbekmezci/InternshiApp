import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import applicationsData from "../data/Applications.json";
import advertsData from "../data/Adverts.json";

const ApplicationDetailsScreen = ({ route }) => {
  const { applicationId, advertId } = route.params;
  const [application, setApplication] = useState(null);
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    const applicationData = applicationsData.applications.find(app => app.id === applicationId);
    const advertData = advertsData.adverts.find(ad => ad.id === advertId);

    setApplication(applicationData);
    setAdvert(advertData);
  }, [applicationId, advertId]);

  if (!application || !advert) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.adTitle}>{advert.title}</Text>
          <Text style={styles.companyName}>{advert.username}</Text>
          <Text style={styles.detailsContent}>{advert.context}</Text>
          <Text style={styles.detailsTitle}>Skills Required:</Text>
          <Text style={styles.detailsContent}>{advert.skills}</Text>
          <Text style={styles.detailsTitle}>Location:</Text>
          <Text style={styles.detailsContent}>{advert.location}</Text>
          <Text style={styles.detailsTitle}>Start Date:</Text>
          <Text style={styles.detailsContent}>{advert.startDate}</Text>
          <Text style={styles.detailsTitle}>End Date:</Text>
          <Text style={styles.detailsContent}>{advert.endDate}</Text>
        </View>
        <View style={styles.statusContainer}>
          {application.status === 'accepted' && (
            <Text style={styles.acceptText}>{advert.acceptText}</Text>
          )}
          {application.status === 'rejected' && (
            <Text style={styles.rejectText}>{advert.rejectText}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F5F2',
  },
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  adTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1678',
    textAlign: 'center',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1678',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1678',
    marginTop: 10,
  },
  detailsContent: {
    fontSize: 16,
    color: '#1C1678',
    marginBottom: 10,
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
  statusContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  acceptText: {
    fontSize: 18,
    color: '#4CAF50',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
  },
  rejectText: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 10,
  },
});
