import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './login-screen';
import RegisterScreen from './register-screen';
import React from 'react';
import HomeScreen from './home-screens';

const Stack = createNativeStackNavigator();

export function MainNavigator(props) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'WasteInsure', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
