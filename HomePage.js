import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import Feather from 'react-native-vector-icons/Feather';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from '@react-navigation/native';

const HomePageContainer = styled(View)`
flex: 1;
align-items: center;
justify-content: center;
`;

const WelcomeTextContainer = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 50px;
`;

const WelcomeText = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  color: #005DA9;
`;

const LoadingIcon = styled(Feather).attrs({
  name: 'loader',
  size: 40,
  color: '#005DA9',
})``;

const HomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

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
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error retrieving user information:', error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <HomePageContainer>
       {loading ? ( 
         <LoadingIcon />
      ) : (
      <WelcomeTextContainer>
        <WelcomeText>Welcome, {firstName} {lastName}!</WelcomeText>
      </WelcomeTextContainer>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
