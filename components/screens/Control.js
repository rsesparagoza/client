import React, { useState, useEffect } from 'react';
import { StatusBar, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Update image imports to directly reference image files
import levelsIcon from '../assets/levelsIcon.png';
import controlIcon from '../assets/controlIcon.png';
import updatesIcon from '../assets/updatesIcon.png';
import profileIcon from '../assets/profileIcon.png';
import AsyncStorage from '@react-native-community/async-storage';

const Control = () => {
  const navigation = useNavigation();

  const [rainwater, setRainwater] = useState(false);
  const [deepwell, setDeepwell] = useState(false);
  const [reservoir, setReservoir] = useState(false);
  const [pHUp, setPhUp] = useState(false);
  const [pHDown, setPhDown] = useState(false);
  const [nutrients, setNutrients] = useState(false);

  const [updatedRainwater, setUpdatedRainwater] = useState(false);
  const [updatedDeepwell, setUpdatedDeepwell] = useState(false);
  const [updatedReservoir, setUpdatedReservoir] = useState(false);
  const [updatedPHUp, setUpdatedPHUp] = useState(false);
  const [updatedPHDown, setUpdatedPHDown] = useState(false);
  const [updatedNutrients, setUpdatedNutrients] = useState(false);

  const displayControl = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      const response = await fetch('http://10.0.2.2:3000/controls', {
        headers: new Headers({
          Authorization: "Bearer " + token
        })
      });
      const data = await response.json();
  
      setRainwater(data.rainwater);
      setDeepwell(data.deepwell);
      setReservoir(data.reservoir);
      setPhUp(data.phUp);
      setPhDown(data.phDown);
      setNutrients(data.nutrients);

    } catch (error) {
      console.error('Error fetching control data:', error);
    }
  };
  const updateControls = async () => {
      try {
          const token = await AsyncStorage.getItem('token');
          const response = await fetch('http://10.0.2.2:3000/updateControls', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                  'rainwater': Boolean(updatedRainwater),
                  'deepwell': Boolean(updatedDeepwell),
                  'reservoir': Boolean(updatedReservoir),
                  'phUp': Boolean(updatedPHUp),
                  'phDown': Boolean(updatedPHDown),
                  'nutrients': Boolean(updatedNutrients),
              })
          });
  
          if (!response.ok) {
              throw new Error('Failed to update controls');
          }
  
          const data = await response.json();
          console.log("Update controls response:", data);
  
          await AsyncStorage.setItem('token', token);
          console.log('Token stored:', token);
      } catch (error) {
          console.error('Error updating controls:', error);
      }
  };

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

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonToggle = (buttonNumber) => {
    if (activeButton === buttonNumber) {
      setActiveButton(null);
    } else {
      if (activeButton !== null) {
        return;
      }
      setActiveButton(buttonNumber);
    }

    console.log(!isButtonActive(buttonNumber));
    console.log(updatedRainwater);

    setUpdatedRainwater(false);
    setUpdatedDeepwell(false);
    setUpdatedReservoir(false);
    setUpdatedPHUp(false);
    setUpdatedPHDown(false);
    setUpdatedNutrients(false);

    switch (buttonNumber) {
      case 1:
        setUpdatedRainwater(isButtonActive(buttonNumber));
        break;
      case 2:
        setUpdatedDeepwell(!isButtonActive(buttonNumber));
        break;
      case 3:
        setUpdatedReservoir(!isButtonActive(buttonNumber));
        break;
      case 5:
        setUpdatedPHUp(!isButtonActive(buttonNumber));
        break;
      case 6:
        setUpdatedPHDown(!isButtonActive(buttonNumber));
        break;
      case 7:
        setUpdatedNutrients(!isButtonActive(buttonNumber));
        break;
      default:
        break;
    }
  };

  const isButtonActive = (buttonNumber) => {
    return activeButton === buttonNumber;
  };

  useEffect(() => {
    console.log("Rainwater: " + !updatedRainwater);
    console.log("Deepwell: " + !updatedDeepwell);
    console.log("Reservoir: " + !updatedReservoir);
    console.log("pH Up: " + !updatedPHUp);
    console.log("pH Down: " + !updatedPHDown);
    console.log("Nutrients: " + !updatedNutrients);
    console.log();
    console.log("Rainwater: " + rainwater);
    console.log("Deepwell: " + deepwell);
    console.log("Reservoir: " + reservoir);
    console.log("pH Up: " + pHUp);
    console.log("pH Down: " + pHDown);
    console.log("Nutrients: " + nutrients);
    if (updatedRainwater || updatedDeepwell || updatedReservoir || updatedPHUp || updatedPHDown || updatedNutrients) {
      // updateControls();
      console.log("1");
    } else if(!updatedRainwater || !updatedDeepwell || !updatedReservoir || !updatedPHUp || !updatedPHDown || !updatedNutrients){
      console.log("2");
    }
    displayControl();
  }, [updatedRainwater, updatedDeepwell, updatedReservoir, updatedPHUp, updatedPHDown, updatedNutrients, rainwater, deepwell, reservoir, pHUp, pHDown, nutrients]);

  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />

      <Text style={[styles.title, styles.heading]}>CONTROL</Text>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.buttonSection}>
            <Text style={styles.sectionTitle}>Valves</Text>
            <View style={styles.line}></View>

            <View style={styles.labelAndButtonContainer}>
              <Text style={styles.labelText}>Rainwater </Text>
              <TouchableOpacity
                onPress={() => handleButtonToggle(1)}
                style={[
                  styles.buttonP,
                  isButtonActive(1) ? styles.buttonOn : styles.buttonOff,
                ]}
              >
                <Text style={styles.buttonTextP}>
                  {isButtonActive(1) ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Label and Toggle Button 2 */}
            <View style={styles.labelAndButtonContainer}>
              <Text style={styles.labelText}>Deepwell</Text>
              <TouchableOpacity
                onPress={() => handleButtonToggle(2)}
                style={[
                  styles.buttonP,
                  deepwell ? styles.buttonOn : styles.buttonOff,
                ]}
              >
                <Text style={styles.buttonTextP}>
                  {deepwell ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Label and Toggle Button 3 */}
            <View style={styles.labelAndButtonContainer}>
              <Text style={styles.labelText}>Reservoir</Text>
              <TouchableOpacity
                onPress={() => handleButtonToggle(3)}
                style={[
                  styles.buttonP,
                  reservoir ? styles.buttonOn : styles.buttonOff,
                ]}
              >
                <Text style={styles.buttonTextP}>
                  {reservoir ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

 {/* Grouped Buttons with Title */}
 <View style={styles.buttonSection}>
            <Text style={styles.sectionTitle}>Pumps</Text>
            <View style={styles.line}></View>
            {/* Label and Toggle Button pH UP */}
            <View style={styles.labelAndButtonContainer}>
              <Text style={styles.labelText}>pH Up      </Text>
              <TouchableOpacity
                onPress={() => handleButtonToggle(5)}
                style={[
                  styles.buttonP,
                  pHUp ? styles.buttonOn : styles.buttonOff,
                ]}
              >
                <Text style={styles.buttonTextP}>
                  {pHUp ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Label and Toggle Button pH DOWN */}
            <View style={styles.labelAndButtonContainer}>
              <Text style={styles.labelText}>pH Down</Text>
              <TouchableOpacity
                onPress={() => handleButtonToggle(6)}
                style={[
                  styles.buttonP,
                  pHDown ? styles.buttonOn : styles.buttonOff,
                ]}
              >
                <Text style={styles.buttonTextP}>
                  {pHDown ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Label and Toggle Button Nutrients */}
            <View style={styles.labelAndButtonContainer}>
              <Text style={styles.labelText}>Nutrients </Text>
              <TouchableOpacity
                onPress={() => handleButtonToggle(7)}
                style={[
                  styles.buttonP,
                  nutrients ? styles.buttonOn : styles.buttonOff,
                ]}
              >
                <Text style={styles.buttonTextP}>
                  {nutrients ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={navigateToScreen1} style={styles.bottomNavButton}>
          <Image source={levelsIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>LEVELS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomNavButton}>
          <Image source={controlIcon} style={styles.bottomNavIcon} />
          <Text style={styles.bottomNavButtonText}>CONTROL</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToScreen3} style={styles.bottomNavButton}>
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    top: 0,
    //paddingTop:20,
    color: 'white',
    left: 25,
  },
  heading: {
    marginBottom: 20,
    fontSize: 50,
    fontWeight: 900,
    paddingTop: 10
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  labelP: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoP: {
    fontSize: 14,
    marginBottom: 15,
  },
  buttonP: {
    backgroundColor: 'green',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonTextP: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoutButtonP: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: 120,
    alignItems: 'center',
    marginVertical: 10,
  },
  logoutButtonTextP: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
  line: {
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginTop: -5,
    marginBottom:20,
  },
  sectionTitle: {
    //fontFamily: 'DMSans',
    fontWeight:'bold',
    fontSize: 30,
    marginBottom: 10,
    color: 'white',  
  },
  labelAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    //fontFamily:'DMSans',
    fontSize: 20,
    marginRight: 10,
    color: 'white',
    width: 120,
  },
  buttonSection: {
    marginBottom: 20,
  },
  buttonOn: {
    backgroundColor: 'lightgreen',
  },
  buttonOff: {
    backgroundColor: 'gray',
  },
});

export default Control;
