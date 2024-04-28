import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Dialog from "react-native-dialog";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [contactNumber, setContactNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const sendVerificationCode = async () => {
    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      setVerificationCode(code);
      console.log(code);

      const response = await fetch('http://10.0.2.2:3000/sendVerCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactNumber: contactNumber,
          verificationCode: code
        })
      });

      if (response.ok) {
        showAlert();
      } else {
        const errorData = await response.json();
        console.error('Error sending verification code:', errorData.message);
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const showAlert = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    verifyCode(inputCode);
  };

  const verifyCode = (inputCode) => {
    if (inputCode === verificationCode) {
      Alert.alert('Verification successful');
      setVisible(false);
    } else {
      Alert.alert('Error', 'Incorrect verification code. Please try again.');
    }
    console.log(inputCode);
    console.log(verificationCode);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <Text style={[styles.title, styles.heading]}>Forgot Password?</Text>
        <Text style={{ color: '#ffffff', fontWeight: '100', fontSize: 12, marginBottom: 40 }}>
          We will send you a verification code.
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Enter Phone Number"
          placeholderTextColor={'gray'}
          onChangeText={(text) => setContactNumber(text)}
          keyboardType="phone-pad"
        />
        <TouchableOpacity onPress={() => sendVerificationCode()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>SEND CODE</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Verification Code</Dialog.Title>
          <Dialog.Input onChangeText={(text) => setInputCode(text)}></Dialog.Input>
          <Dialog.Description>
            Please enter the verification code you received.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Submit" onPress={handleSubmit} />
        </Dialog.Container>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
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
    fontSize: 25
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
    fontSize: 18
  }
});

export default ForgotPassword;
