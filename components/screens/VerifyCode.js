import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const Confirmpassword = () => {
  const [OTP, setOTP] = useState('');
  const [buttonColor, setButtonColor] = useState('green');
  const navigation = useNavigation();

  const confirmPassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <Text style={[styles.title, styles.heading]}>Enter Code</Text>
        <Text style={{ color: '#ffffff', fontWeight: '100', fontSize:12, marginBottom: 30 }}>Please check SMS for the code.</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Code"
          placeholderTextColor={'gray'}
          onChangeText={(text) => setOTP(text)}
        />
        
        <TouchableOpacity onPress={confirmPassword}>
          <View style={[styles.button, { backgroundColor: buttonColor }]}>
            <Text style={styles.buttonText}>VERIFY</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    padding: 20, // Add padding to create space between content and background
    borderRadius: 20, // Add border radius to create rounded corners
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Set a semi-transparent white background color
    backdropFilter: 'blur(5px)', // Apply blur effect
    border: '1px solid rgba(255, 255, 255, 0.3)', // Add border for better visibility
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    width: '80%',
    marginBottom: 10,
    padding: 8,
    color: 'white'
  },
  heading: {
    marginBottom: 8,
    fontSize: 25,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  smallText: {
    fontSize: 12,
    color: '#8d8b8b',
    marginBottom: 5
  },
});

export default Confirmpassword;
