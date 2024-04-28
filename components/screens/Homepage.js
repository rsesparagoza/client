import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  Button ,TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

export default function App(props) {
  const [buttonColor, setButtonColor] = useState('#27a80e');
  const navigation = useNavigation();

    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token){
        props.navigation.replace('Levels');
      }
    
    };
  
    useEffect(() => {
      checkLogin();
    },[])

  const handleLogin = () => {
    setButtonColor('#8bff8b');
    setTimeout(() => {
      setButtonColor('green');
    }, 10);
  };

  const pressLogin = () => {
    navigation.replace('Login');
  };

  const pressRegister = () => {
    navigation.replace('Register');
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.appContainer}>
          <Text style={styles.text}>Welcome to </Text>
          <Text style={[styles.title, styles.heading]}>HydroAPP</Text>

          <TouchableOpacity onPress={pressLogin}>
            <View style={[styles.button, { backgroundColor: buttonColor }]}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={pressRegister}>
            <View style={[styles.button, { backgroundColor: buttonColor }]}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 1,
    color: 'black',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkgreen',
  },
  heading: {
    marginBottom: 1,
    fontSize: 30,
  },
  button: {
    backgroundColor: ' ',
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
});
