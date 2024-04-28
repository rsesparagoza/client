import React, {useState, useEffect, Component} from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';


export default function Editprofile() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const displayUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await fetch('http://10.0.2.2:3000/user', {
        headers: new Headers({
          Authorization: "Bearer " + token
        })
      });
      const data = await response.json();
  
      setEmail(data.email);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setUsername(data.username);
      setContactNumber(JSON.stringify(data.contactNumber));

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  
  useEffect(() => {
    displayUser();
  },[]);

  const handleSubmit = () => {
    if (!username || !contactNumber || !email) {
        Toast.show('Please fill in all fields');
        //setEmptyFieldsError('Please fill in all fields');
        return;
    } else{
        sendCred();
    }
  };

    const sendCred = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://10.0.2.2:3000/editProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({
                    'username': username,
                    'contactNumber': contactNumber,
                    'email': email
                })
            });
    
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
    
            const data = await response.json();
            console.log("Edit profile response:", data);
    
            await AsyncStorage.setItem('token', token);
            console.log('Token stored:', token);
            Toast.show('Profile updated successfully', 1);
            navigation.replace('Profile');
        } catch (error) {
            console.error('Error editing profile:', error);
            Toast.show('Failed to update profile. Please try again.', 1);
        }
    };
    

  const handleSaveChanges = () => {
    navigation.replace('Profile'); // Assuming you have a screen named 'EditProfile'
  };

  const handleCancel = () => {
    navigation.replace('Profile'); 
  };
  
  return (
    <KeyboardAvoidingView style={[styles.appContainer, { flex: 1 }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>EDIT PROFILE</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.formFields}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <TextInput
            defaultValue={firstName + " " + lastName}
            editable={false}
            style={styles.fieldInput}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Username</Text>
          <TextInput
            defaultValue={username}
            style={styles.fieldInput}
            onChangeText={(text) => setUsername(text)}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.fieldInput}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Phone Number</Text>
          <TextInput
            defaultValue= {contactNumber}
            style={styles.fieldInput}
            textContentType='telephoneNumber' 
            dataDetectorTypes='phoneNumber' 
            keyboardType='phone-pad' 
            maxLength={11}
            onChangeText={(text) => setContactNumber(text)}
          />
        </View>
{/* Update Button */}
        <TouchableOpacity 
          style={styles.updateButton}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.updateButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>CANCEL</Text>
        </TouchableOpacity>
          
        
      </View>
    </KeyboardAvoidingView>
  );
}




const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  topBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 1,
    paddingTop: 5,
    transform: [{ translateX: -5 }, { translateY: 10 }],
  },
  formFields: {
    alignItems: 'center',
    paddingTop: 70,
  },
  field: {
    marginBottom: 16,
    width: '70%',
  },
  fieldLabel: {
    fontSize: 14,
    color: '#8a8a8a',
  },
  fieldInput: {
    height: 40,
    backgroundColor: '#474241',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 4,
    color: 'white',
  },
  updateButton: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cancelButton: {
    backgroundColor: '#fd1a1a',
    padding: 10,
    borderRadius: 25,
    marginTop: 20,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

