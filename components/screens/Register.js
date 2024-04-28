import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Alert, ToastAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const Register = () => {

    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [buttonColor, setButtonColor] = useState('green');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emptyFieldsError, setEmptyFieldsError] = useState('');

    const handleLoginPress = () => {
    navigation.replace('Login');
    };

    const handleSubmit = () => {
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword || !contactNumber) {
            Toast.show('Please fill in all fields');
            //setEmptyFieldsError('Please fill in all fields');
            return;
        } else{
            if(password < 6 && confirmPassword < 6){
                Toast.show('Password must be at least 6 characters long');
            } else {
                if(confirmPassword != password){
                    Toast.show("Password do not match", 1);
                } else {
                    sendCred();
                }
            }
        }
    };

    const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
        Toast.show('Invalid email address');
        //setEmailError('Invalid email address');
    } else {
        setEmailError('');
    }
    setEmail(text);
    };

    const validatePassword = (text) => {
    if (text.length < 6) {
        Toast.show('Password must be at least 6 characters long');
        //setPasswordError('Password must be at least 6 characters long');
    } else {
        setPasswordError('');
    }
    setPassword(text);
    };

    const validateConfirmPassword = (text) => {
    if (text.length < 6) {
        Toast.show('Password must be at least 6 characters long');
        //setConfirmPasswordError('Password must be at least 6 characters long');
    } else {
        setConfirmPasswordError('');
    }
    setConfirmPassword(text);
    };


    const sendCred = async () => {

    try {
        const response = await fetch('http://10.0.2.2:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'firstName': firstName,
            'lastName': lastName,
            'username': username,
            'email': email,
            'password': password,
            'confirmPassword': confirmPassword,
            'contactNumber': contactNumber
        })
        });

        const data = await response.json();
        console.log("Signup response:", data);
        
        if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        // await AsyncStorage.setItem('firstName', JSON.stringify(data.firstName));
        console.log('Token stored:', data.token);
        Toast.show('You have successfully signed up.');
        //Alert.alert('Signup Successful!', 'You have successfully signed up.');
        navigation.replace('Login');
        } else {
        Toast.show('Something went wrong.', 1);
        //Alert.alert('Signup Failed', data.message || 'Something went wrong.');
        }
    } catch (error) {
        console.error('Error signing up:', error);
        Toast.show('An error occurred while signing up.');
        //Alert.alert('Signup Failed', 'An error occurred while signing up.');
    }

};

  return (
    <KeyboardAvoidingView style={[styles.appContainer, { flex: 1 }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputContainer}>
        <Text style={[styles.title, styles.heading]}>REGISTER</Text>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor={'gray'}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor={'gray'}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          placeholderTextColor={'gray'}
          value={email}
          onChangeText={(text) => validateEmail(text)}
          error={emailError ? true : false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          placeholderTextColor={'gray'}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
        style={styles.textInput}
        placeholder="Password"
        placeholderTextColor={'gray'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        error={passwordError ? true : false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          placeholderTextColor={'gray'}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          error={confirmPasswordError ? true : false}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contact Number"
          placeholderTextColor={'gray'}
          value={contactNumber || "09"}
          onChangeText={(text) => setContactNumber(text)}
          textContentType='telephoneNumber' 
          dataDetectorTypes='phoneNumber' 
          keyboardType='phone-pad' 
          maxLength={11}
        />
        <View style={styles.registerContainer}>
            <Button 
            mode="contained" 
            style={{marginLeft:18, marginRight:18, marginTop:18, backgroundColor:"green"}}
            onPress={() => handleSubmit()}
            >
            Sign Up
            </Button>
        </View>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.smallText}>Already have an account? </Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={[styles.smallText, styles.linkGreen]}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 300,
    padding: 20, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    backdropFilter: 'blur(5px)', 
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
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
  text: {
    marginBottom: 30,
    color: 'white',
  },
  smallText: {
    fontSize: 12,
    color: 'white'
  },
  linkGreen: {
    color: 'green',
    textDecorationLine: 'underline',
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Register;