import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Parse } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import levelsIcon from '../assets/levelsIcon.png';
import controlIcon from '../assets/controlIcon.png';
import updatesIcon from '../assets/updatesIcon.png';
import profileIcon from '../assets/profileIcon.png';
import profile from '../assets/profile.png';
import name from '../assets/name.png';
import usernameImage from '../assets/username.png';
import emailImage from '../assets/email.png';
import phone from '../assets/phone.png';


export default function Profile(props) { // Updated component name
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');


  const displayUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
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
      setContactNumber(data.contactNumber);
      console.log(data.userId);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  
  useEffect(() => {
    displayUser();
  },[]);


  const navigateToScreen1 = () => {
    navigation.replace('Levels'); 
  };

  const navigateToScreen2 = () => {
    navigation.replace('Control'); 
  };

  const navigateToScreen3 = () => {
    navigation.replace('Updates'); 
  };

  const navigateToScreen4 = () => {
    navigation.replace('Profile'); 
  };

  const handleEditProfile = () => {
    navigation.replace('EditProfile'); 
  };

  const handleChangePass = () => {
    navigation.replace('ChangePass'); 
  };


  const handleLogout = () => {
    navigation.replace('Login'); 
  };

    const logout = () => {
        AsyncStorage.removeItem('token').then(() => {
        props.navigation.replace('Homepage');
        });
    };

  const fullName= "Juan Dela Cruz";
  

  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />

      <Text style={[styles.title, styles.heading]}>PROFILE</Text>

      <Image source={profile} style={styles.profile} />

     
        
        <View style={styles.profileInfo}>
          
        <Image source={name} style={[styles.profileicons, { width: 20, height:20, top: -30, left: 50 }]}/>
        <Image source={usernameImage} style={[styles.profileicons, { top: 45, left: 50 }]}/>
        <Image source={emailImage} style={[styles.profileicons, { top: 110, left: 50 }]}/>
        <Image source={phone} style={[styles.profileicons, { top: 180, left: 50 }]}/>

          <Text style={styles.infoP}>{firstName + " " + lastName}</Text>
          <View style={styles.line}></View>
          <Text style={styles.infoP}>{username}</Text>
          <View style={styles.line}></View>
          <Text style={styles.infoP}>{email}</Text> 
          <View style={styles.line}></View>
          <Text style={styles.infoP}> 0{contactNumber}</Text> 
          <View style={styles.line}></View>
          
          

          <TouchableOpacity style={styles.buttonEditProfile} onPress={handleEditProfile}>
            <Text style={styles.buttonTextP}>EDIT PROFILE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonChangePass} onPress={handleChangePass}>
            <Text style={styles.buttonTextP}>CHANGE PASSWORD</Text>
          </TouchableOpacity>
    
          <TouchableOpacity style={styles.buttonLogout} onPress={() => logout()}>
            <Text style={styles.buttonTextP}>LOGOUT</Text>
          </TouchableOpacity>

        </View>
      {/* </ScrollView> */}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={navigateToScreen1} style={styles.bottomNavButton}>
          <Image source={levelsIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>LEVELS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToScreen2} style={styles.bottomNavButton}>
          <Image source={controlIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>CONTROL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToScreen3} style={styles.bottomNavButton}>
          <Image source={updatesIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>UPDATES</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavButton}>
          <Image source={profileIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    position: 'absolute',
    top: 0,
    color: 'white',
    left: 25,
    marginBottom: 40,
  },
  heading: {
    marginBottom: 20,
    fontSize: 50,
    fontWeight: 900,
    paddingTop: 10
    
  },
  profile: {
    height: 80,
    width: 80,
    position: 'absolute',
    borderRadius: 40,
    transform: [{ translateY: -240 }],
    
  },
  profileicons:{
    height: 25,
    width: 25,
    position: 'absolute',
    
  },

  profileInfo: {
    alignItems: 'center',
    marginBottom: -50,
  },
  line: {
    width: 400, 
    borderBottomWidth: 1,
    borderBottomColor: '#838383',
    marginBottom:10,
    marginTop:10,
    transform: [{ translateY: -43 }],
  },
  infoP: {
    top: -40,
    fontSize: 18,
    marginBottom: 15,
    color: '#80ff4d',
    textAlign: 'left',
    paddingTop: 10,
    paddingLeft: 140,
    alignSelf: 'flex-start',
    width: '100%',
  },
  buttonEditProfile: {
    position: 'absolute',
    top: 260, 
    //left: 125, // Adjust the left position as needed
    backgroundColor: '#06a113',
    padding: 8,
    borderRadius: 3,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center', 
    height: 40,
    borderRadius: 25
  },
  buttonChangePass:{
    position: 'absolute',
    top: 315, 
    //left: 125, // Adjust the left position as needed
    backgroundColor: '#006409',
    padding: 8,
    borderRadius: 3,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center', 
    height: 40,
    borderRadius: 25
  },
  buttonLogout:{
    position: 'absolute',
    top: 370, 
    //left: 125, // Adjust the left position as needed
    backgroundColor: '#636363',
    padding: 8,
    borderRadius: 3,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center', 
    height: 40,
    borderRadius: 25
  },
  buttonTextP: {
    //fontFamily: 'DMSans',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  bottomNavIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomNavButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomNavButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
});
