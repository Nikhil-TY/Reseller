import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AppRegistry } from 'react-native';

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyAe_Hxn3bW3tSYV2FUlOu24Oq_7WUQAldI",
  authDomain: "reseller-c6a78.firebaseapp.com",
  projectId: "reseller-c6a78",
  storageBucket: "reseller-c6a78.appspot.com",
  messagingSenderId: "753532863139",
  appId: "1:753532863139:web:c6a5e3e9cd37736d84f516",
  measurementId: "G-LMKGCX7VXC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for the splash screen
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Adjust the duration as needed
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerTitleStyle: {
              color: '#005DA9', // Change the color to your desired color
            },
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupPage}
          options={{
            headerTitleStyle: {
              color: '#005DA9', // Change the color to your desired color
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerTransparent: true,
            headerTitle: '',
            headerTitleStyle: {
              color: '#005DA9', // Change the color to your desired color
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

