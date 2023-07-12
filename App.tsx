/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import firebase from 'firebase/compat/app';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SplashScreen from './SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import OrdersPage from './OrdersPage';

// Your Firebase project configuration
const firebaseConfig = {
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

const Drawer = createDrawerNavigator();

const SidebarContainer = styled.ScrollView`
  background-color: #ffff;
  padding: 10px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 8px;
  background-color: #ccc;
  align-items: center;
`;

const StyledFontAwesome = styled(FontAwesome)`
  margin-left: 10px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 30px;
  
`;

const MenuItemText = styled.Text`
  font-size: 18px;
  color: black;
  margin-left: 10px;
`;
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
      <Drawer.Navigator
        drawerContent={({ navigation }) => (
          <View style={{ height: '100%' }}>
            <SidebarContainer>
              <CloseButton onPress={() => navigation.closeDrawer()}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <StyledFontAwesome name="arrow-left" size={44} color="#005DA9" />
                <Text style={{ marginLeft: 5, color:'black' }}>Back</Text>
              </View>
              </CloseButton>

              <MenuItem onPress={() => navigation.navigate('Home')}>
                <StyledFontAwesome name="home" size={24} color="#005DA9" />
                <MenuItemText>Home</MenuItemText>
              </MenuItem>
              <MenuItem onPress={() => navigation.navigate('Orders')}>
                <StyledFontAwesome name="shopping-cart" size={24} color="#005DA9" />
                <MenuItemText>Orders</MenuItemText>
              </MenuItem>
              <MenuItem
                onPress={() => {
                  firebase
                    .auth()
                    .signOut()
                    .then(async () => {
                      await AsyncStorage.clear();
                      Alert.alert('Logout Successful', 'You have been logged out successfully.');
                      navigation.navigate('Login');
                    })
                    .catch((error) => {
                      Alert.alert('Logout Error', `An error occurred while logging out: ${error}`);
                    });
                }}
              >
                <StyledFontAwesome name="sign-out" size={24} color="#005DA9" />
                <MenuItemText>Logout</MenuItemText>
              </MenuItem>
            </SidebarContainer>
          </View>
        )}>

        <Drawer.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="Signup"
          component={SignupPage}
          options={{
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="Home"
          component={HomePage}
          options={({ navigation }) => ({
            headerTitleStyle: {
              color: '#005DA9',  fontWeight: 'bold', fontSize: 30
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <StyledFontAwesome
                name="bars"
                size={24}
                color="#005DA9"
                onPress={() => navigation.openDrawer()}
              />
            ),
          })}
        />

        <Drawer.Screen
          name="Orders"
          component={OrdersPage}
          options={{
            headerTitleStyle: {
              color: '#005DA9',
            },
            headerTintColor: '#005DA9', 
          }}
        />

       </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
