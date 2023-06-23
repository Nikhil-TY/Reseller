import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const HomePageContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WelcomeText = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #005DA9;
`;

const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

 
useEffect(() => {
  // Retrieve the user information from Firebase Firestore
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    firebase
      .firestore()
      .collection('users')
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
        }
      })
      .catch((error) => {
        console.error('Error retrieving user information:', error);
      });
  }
}, []);

return (
  <HomePageContainer>
    <WelcomeText>Welcome, {firstName} {lastName}!</WelcomeText>
  </HomePageContainer>
);
};

export default HomePage;
