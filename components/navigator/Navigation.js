import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Homepage from '../screens/Homepage';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/Forgotpassword';
import VerifyCode from '../screens/VerifyCode';
import ChangePassword from '../screens/Changepassword';
import changepass from '../screens/changepassprofile';
import Control from '../screens/Control';
import Updates from '../screens/Updates';
import Profile from '../screens/Profile';
import Levels from '../screens/Levels';
import Editprofile from '../screens/Editprofile';



const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle:{
        backgroundColor: 'transparent'
      },
      headerTransparent: true,
          headerTitle: '', 
          headerLeftContainerStyle: {
            paddingLeft: 20,
          }
    }}
        initialRouteName='Homepage'>

      <Stack.Screen 
        name="Homepage" 
        component={Homepage}>
      </Stack.Screen>

      <Stack.Screen 
        name="Login" 
        component={Login}>
      </Stack.Screen>

      <Stack.Screen 
        name="Register" 
        component={Register}>
      </Stack.Screen>

      <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitleAlign: 'center',
            headerLeftContainerStyle: {
            paddingLeft: 20
          }
        }}
      />

      <Stack.Screen 
        name="VerifyCode" 
        component={VerifyCode}>
      </Stack.Screen>

      <Stack.Screen 
        name="ChangePassword" 
        component={ChangePassword}>
      </Stack.Screen>
     
      

      <Stack.Screen 
        name="Levels" 
        component={Levels} 
        options={{
          headerTitleAlign : 'center',
          headerLeft: () => null
        }}/>

      <Stack.Screen 
        name="Control" 
        component={Control} 
        options={{
          headerTitleAlign : 'center',
          headerLeft: () => null
        }}/>

      <Stack.Screen 
        name="Updates" 
        component={Updates}
        options={{
          headerTitleAlign : 'center',
          headerLeft: () => null
        }}/>

      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={{
          headerTitleAlign : 'center',
          headerLeft: () => null
        }}/>

      <Stack.Screen 
        name="EditProfile" 
        component={Editprofile}
        options={{
          headerTitleAlign : 'center',
          headerLeft: () => null
        }}/>

      <Stack.Screen 
      name="ChangePass" 
      component={changepass}
      options={{
          headerTitleAlign : 'center',
          headerLeft: () => null
        }}/>


      

     
    </Stack.Navigator>
  );
};

export default Navigation;