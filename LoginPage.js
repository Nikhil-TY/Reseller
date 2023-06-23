import React from 'react';
import {Button, Alert, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { SvgUri } from 'react-native-svg';

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignupPress = () => {
    navigation.navigate('Signup');
  };
  
  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        Alert.alert('Success', 'Login successful', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]);
      })
      .catch((error) => {
        console.error('Login error:', error);
        Alert.alert('Error', 'Login failed. Please check your credentials and try again.');
      });
  };


  return (
    <Container>
      <LogoImage 
        uri="https://www.coats.com/Content/Coats/assets/img/logo.svg"
        width={250} // Adjust the width as needed
        height={250} // Adjust the height as needed
      />

      <Input
        placeholder="Username: @coats.com"
        placeholderTextColor="#aaa"
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={setPassword}
      />

      <ButtonContainer onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </ButtonContainer>

      <SignupLinkText onPress={handleSignupPress}>Sign up</SignupLinkText>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled(SvgUri)`
  width: 250px;
  height: 250px;
  margin-bottom: 60px;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 40px;
  background-color: #f9f9f9;
  margin-top: 30px;
  padding-horizontal: 10px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #aaa;
  color: #000;
`;

const ButtonContainer = styled(TouchableOpacity)`
  background-color: #005DA9;
  margin-top: 30px;
  border-radius: 30px;
  padding-vertical: 10px;
  padding-horizontal: 130px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const SignupLinkText = styled.Text`
  color: #005DA9;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  text-decoration-line: underline;
`;

export default LoginPage;
