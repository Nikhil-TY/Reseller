import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const Container = styled.View`
  padding-horizontal: 20px;
  padding-top: 20px;
  color: #005DA9;
`;

const Label = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #005DA9;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: grey;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
  color: black;
  font-size: 17px;
`;

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from Firebase Firestore
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(userId);

    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // User details found, set state
          setUserDetails(doc.data());
        } else {
          // User details not found
          console.log('User details not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, []);

  return (
    <Container>
      {userDetails && (
        <View>
          <Label>First Name:</Label>
          <Input value={userDetails.firstName} editable={false} />

          <Label>Last Name:</Label>
          <Input value={userDetails.lastName} editable={false} />

          <Label>Mobile Number:</Label>
          <Input value={userDetails.mobileNumber} editable={false} />

          <Label>Email:</Label>
          <Input value={userDetails.email} editable={false} />
        </View>
      )}
    </Container>
  );
};

export default ProfilePage;
