import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Button, TextInput, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const SignupPage = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleSubmit = () => {
    if (!firstName || !lastName || !mobileNumber || !email || !password || !retypePassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long');
      return;
    }

    if (password !== retypePassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;

        // Save additional user information to Firebase Firestore
        firebase.firestore().collection('users').doc(user.uid).set({
          firstName,
          lastName,
          mobileNumber,
        })
        .then(() => {
          Alert.alert('Success', 'Signup successful. Please login again.', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]);
        })
        .catch((error) => {
          console.error('Error saving user information:', error);
          Alert.alert('Error', 'Signup failed. Please try again.');
        });
      })
      .catch((error) => {
        console.error('Signup error:', error);
        Alert.alert('Error', 'Signup failed. Please try again.');
      });
  };

  return (
    <Container>
      <FieldContainer>
        <Label>First Name</Label>
        <Input
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <Label>Last Name</Label>
        <Input
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <Label>Mobile Number</Label>
        <Input
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Enter your mobile number"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <Label>Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter your password"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <Label>Retype Password</Label>
        <Input
          value={retypePassword}
          onChangeText={setRetypePassword}
          secureTextEntry
          placeholder="Retype your password"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <SubmitButton onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </SubmitButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
`;

const FieldContainer = styled.View`
  margin-top: 20px;
`;

const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
  color: #000;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 16px;
  color: #000;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #005DA9;
  margin-top: 90px;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default SignupPage;
