import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ForkScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CSignUp')}>
                <Text style={styles.buttonText}>Kurumsal Hesap Oluştur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('StudentSignUp')}>
                <Text style={styles.buttonText}>Bireysel Hesap Oluştur</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F5F2',
    },
    button: {
        backgroundColor: '#1C1678',
        width: 300,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForkScreen;
