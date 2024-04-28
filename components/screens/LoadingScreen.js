
import React,{useEffect,useState} from 'react';
import {  Button ,TextInput} from 'react-native-paper';
import {
    ActivityIndicator,
    StyleSheet,
    View
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen= (props) => {

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
      props.navigation.replace('home');
    }
    else {
      props.navigation.replace('login');
    }
  };

  useEffect(() => {
    checkLogin();
  },[])

  return (
    <View style={styles.loading}>
        <ActivityIndicator size='large' color='blue'/>
    </View>
  );
};

const styles=StyleSheet.create({
    loading:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }
  
  })
export default LoadingScreen;