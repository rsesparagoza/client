import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';

const Cancel = (navigation) => {
  navigation.replace('Profile'); 
};

const ChangePasswordScreen   = () => {

    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [buttonColor, setButtonColor] = useState('green');
  
    const navigation = useNavigation();

    const handleSubmit = () => {
        if (!oldPassword || !password || !confirmPassword) {
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
      
    const sendCred = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://10.0.2.2:3000/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'oldPassword': oldPassword,
                    'password': password,
                    'confirmPassword': confirmPassword,
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            const data = await response.json();
            console.log("Update password response:", data);
    
            await AsyncStorage.setItem('token', token);
            console.log('Token stored:', token);
            Toast.show('Password updated successfully', 1);
            navigation.replace('Profile');
        } catch (error) {
            console.error('Error updating password:', error);
            Toast.show('Failed to update password. Please try again.', 1);
        }
  
    };

  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <Text style={[styles.title, styles.heading]}>UPDATE PASSWORD</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Old Password"
          placeholderTextColor={'gray'}
          secureTextEntry={true}
          onChangeText={(text) => setOldPassword(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="New Password"
          placeholderTextColor={'gray'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm New Password"
          placeholderTextColor={'gray'}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={[styles.resetbutton, { backgroundColor: buttonColor }]}>
            <Text style={styles.buttonText}>RESET PASSWORD</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Cancel(navigation)}>
          <View style={[styles.button]}>
          <Text style={styles.buttonText}>CANCEL</Text>
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
    alignItems: 'center',
    width: 300,
    padding: 20, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    backdropFilter: 'blur(5px)', 
    border: '1px solid rgba(255, 255, 255, 0.3)',
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
    marginBottom: 40,
    fontSize: 25,
  },
  text: {
    marginBottom: 30,
    color: 'white',
  },
  smallText: {
    fontSize: 12,
  },
  linkGreen: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#fd1a1a',
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    width: 250,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetbutton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 25,
    marginTop: 35,
    width: 250,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ChangePasswordScreen;