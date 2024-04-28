import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';

// Assume you have some icon images in the assets folder
import levelsIcon from '../assets/levelsIcon.png';
import controlIcon from '../assets/controlIcon.png';
import updatesIcon from '../assets/updatesIcon.png';
import profileIcon from '../assets/profileIcon.png';
import leafImage from '../assets/leaf.png'; 
import tempimg from '../assets/temperature.png';
import AsyncStorage from '@react-native-community/async-storage';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const [pHLevel, setPHLevel] = useState('');
  const [ppm, setPpm] = useState('');
  const [tempUpdate, setTemp] = useState('');

  const navigateToScreen1 = () => {
    navigation.replace('Levels');
  };

  const navigateToScreen2 = () => {
    navigation.replace('Control');
  };

  const navigateToScreen3 = () => {
    navigation.navigate('Updates');
  };

  const navigateToScreen4 = () => {
    navigation.replace('Profile');
  };

  const beforepH = pHLevel;
  const afterpH = 6.3;

  const beforeNutrients = ppm;
  const afterNutrients = 750;
  const temp = tempUpdate;

  const displayReadings = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      const response = await fetch('http://10.0.2.2:3000/readings', {
        headers: new Headers({
          Authorization: "Bearer " + token
        })
      });
      const data = await response.json();
  
      setPHLevel(data.pHLevel);
      setPpm(data.ppm);
      setTemp(data.temp);

      console.log("Username: " + data.username);
      console.log("pH Level: " + data.pHLevel);
      console.log("ppm: " + data.ppm);
      console.log("temp: " + data.temp);
      console.log(data);

    } catch (error) {
      console.error('Error fetching readings data:', error);
    }
  };

useEffect(() => {
  displayReadings();
},[]);

  const notifications = [
    'Log 1: Tank 1 is full',
    'Log 2: Switched to rainwater',
    'Log 3: Nutrients Added',
    'Log 4: Tank 1 is full',
    'Log 5: Switched to rainwater',
    'Log 6: Nutrients Added',
    'Log 7: Tank 1 is full',
    'Log 8: Switched to rainwater',
    'Log 9: Nutrients Added',
    'Log 10: Switched to rainwater',
    'Log 11: Nutrients Added',
    'Log 12: Tank 1 is full',
    'Log 13: Switched to rainwater',
    'Log 14: Nutrients Added',
  ];

  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />

      <Text style={[styles.title, styles.heading]}>UPDATES</Text>

      <View style={styles.reservoirContainer}>
        <Text style={styles.reservoirReadings}>Reservoir Readings</Text>
      </View>
      <View style={styles.line}></View>
      {/* <Text style={styles.label}>  pH                      Nutrients </Text>
      <Text style={styles.labelNutrients}> pH Reading</Text> */}
      
      {/* Insert code here. */}

      <View style={styles.rowContainer}>

  {/* pH Level Circle */}
  <View style={styles.rectangle1}>
    <Text style={styles.rectangleTextBefore}>pH</Text>
    <Text style={styles.rectangleTextAfter1}>{beforepH}</Text>
  </View>

  {/* Nutrients Circle */}
  
  <View style={styles.rectangle2}>
  <Image source={leafImage} style={styles.leafImage} />
  <Text style={styles.rectangleTextAfter}>{beforeNutrients} ppm</Text>
</View>
    

   {/* Temperature Circle */}
<View style={styles.rectangle3}>
  <Image source={tempimg} style={styles.leafImage} />
  <Text style={styles.rectangleTextAfter}>{temp} ℃</Text> 
</View> 


</View>



      <Text style={styles.updates}>Updates</Text>
      <View style={styles.line}></View>
      <Text style={styles.today}>Today</Text>

      {/* List of notifications */}
      <ScrollView style={[styles.scrollView, { marginBottom: 100 }]}>
        {notifications.map((notification, index) => (
          <Text key={index} style={styles.notificationItem}>
            {notification}
          </Text>
        ))}
      </ScrollView>

      {/* Bottom Navigation Inside appContainer */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={navigateToScreen1} style={styles.bottomNavButton}>
          <Image source={levelsIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>LEVELS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToScreen2} style={styles.bottomNavButton}>
          <Image source={controlIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>CONTROL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavButton}>
          <Image source={updatesIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>UPDATES</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToScreen4} style={styles.bottomNavButton}>
          <Image source={profileIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100, // Adjust as needed
  },
  rectangle1: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent', // Set background color to transparent
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -110,
    borderRadius: 35, // Half of width and height to make it a circle
    borderWidth: 5, // Border width to create the ring effect
    borderColor: '#FF5733', // Border color
    marginHorizontal: 20,
    left: -50
  },
  
  rectangle2: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent', // Set background color to transparent
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -110,
    borderRadius: 35, // Half of width and height to make it a circle
    borderWidth: 5, // Border width to create the ring effect
    borderColor: '#ffd415', // Border color
    left: -20
  },
  leafImage: {
    width: 45, // Adjust the width and height as needed
    height: 45,
    position: 'absolute', // Position the image absolutely within its parent container
    top: 10, // Adjust the top position as needed
    left: 8,
  },  
  
  rectangle3: {
    width: 70,
    height: 70,
    backgroundColor: 'transparent', // Set background color to transparent
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -110,
    borderRadius: 35, // Half of width and height to make it a circle
    borderWidth: 5, // Border width to create the ring effect
    borderColor: '#3392ff', // Border color
    //marginHorizontal: 10,
    left: 30
    
  },
  
  
  rectangleTextBefore: {
    color: 'white',
    marginLeft: -50,
    fontSize: 30,
    fontWeight: "500",
    left: 25,
    top: 8
  },
  rectangleTextAfter: {
    color: 'white',
    marginLeft: -10,
    fontSize: 15,
    fontWeight: '400',
    transform: [{ translateY: 50 }],
    left: 5
  },
  rectangleTextAfter1:{
    color: 'white',
    marginLeft: -10,
    fontSize: 15,
    fontWeight: '400',
    transform: [{ translateY: 30 }],
    left: 5
  },
  
 
  reservoirContainer: {
    marginTop: 50, // Adjust as needed
  },
  
  scrollView: {
    fadingEdgeLength: 0,
    flex: 1,
    marginBottom: 20,
  },
  notificationItem: {
    fontSize: 16,
    color: 'white',
    marginVertical: 8,
    marginLeft: 16,
  },
  title: {
    
    position: 'absolute',
    top: 0,
    //paddingTop:20,
    color: 'white',
    left: 25, // Adjust left positioning as needed
  },
  heading: {
    marginBottom: 20,
    fontSize: 50,
    fontWeight: 900,
    paddingTop: 10
    //fontFamily:'ArchivoBlack'
    
  },

  label: {
    //fontFamily: 'DMSans',
    fontWeight:'bold',
    fontSize: 23,
    marginTop:20,
    left: 10,
    color: 'white',
  },

  labelpH: {
    //fontFamily: 'DMSans',
    fontWeight:'bold',
    fontSize: 20,
    right: 100,
    color: 'white',
  },

  today: {
    //fontFamily: 'DMSans',
    fontWeight:'bold',
    fontSize: 20,
    right: 110,
    marginTop: 0,
    marginBottom: 12,
    color: 'white',
  },
  updates: {
    //fontFamily: 'DMSans',
    fontWeight:'bold',
    fontSize: 28,
    right: 110,
    marginTop: 50,
    marginBottom: 5,
    color: 'white',
  },

  reservoirReadings: {
    //fontFamily: 'DMSans',
    fontWeight:'bold',
    fontSize: 28,
    right: 40,
    marginTop: 60,
    marginBottom: 5,
    color: 'white',

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
    borderTopLeftRadius: 30, // Adjust top left border radius
    borderTopRightRadius: 30, 
  },
  bottomNavButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  line: {
    width: 330, // Adjust the width of the line as needed
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom:10,
    marginTop:5,
  },
  bottomNavButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomNavIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
});

export default DashboardScreen;
