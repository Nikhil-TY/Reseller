import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { ScrollView } from 'react-native-gesture-handler';


const SignupPage = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstNameFocus, setFirstNameFocus] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);
  const [mobileNumberFocus, setMobileNumberFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [retypePasswordFocus, setRetypePasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [retypePasswordError, setRetypePasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (firstNameError || lastNameError || mobileNumberError || emailError || passwordError || retypePasswordError) {
      setFirstNameFocus(false);
      setLastNameFocus(false);
      setMobileNumberFocus(false);
      setEmailFocus(false);
      setPasswordFocus(false);
      setRetypePasswordFocus(false);
    }
  }, [firstNameError, lastNameError, mobileNumberError, emailError, passwordError, retypePasswordError]);

  
  const handleSubmit = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setMobileNumberError(false);
    setEmailError(false);
    setPasswordError(false);
    setRetypePasswordError(false);

    let hasError = false;

    // Check each field and set error state if empty
    if (!firstName) {
      setFirstNameError(true);
      hasError = true;
    }
    if (!lastName) {
      setLastNameError(true);
      hasError = true;
    }
    if (!mobileNumber) {
      setMobileNumberError(true);
      hasError = true;
    }
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!password || !retypePassword) {
      setPasswordError(true);
      hasError = true;
    }
    if (!retypePassword) {
      setRetypePasswordError(true);
      hasError = true;
    }
  
    // Display error message if any field is empty
    if (hasError) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Mobile number validation checks
    if (!/^\d{10}$/.test(mobileNumber)) {
      Alert.alert('Error', 'Make sure your Mobile number consists only numericals and 10 digits long.');
      setMobileNumberError(true);
      return;
    }
  
    // Password validation checks
    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long');
      setPasswordError(true);
      return;
    }
  
    if (!/(?=.*[a-z])/.test(password)) {
      Alert.alert('Error', 'Password should contain at least one lowercase letter');
      setPasswordError(true);
      return;
    }
  
    if (!/(?=.*[A-Z])/.test(password)) {
      Alert.alert('Error', 'Password should contain at least one uppercase letter');
      setPasswordError(true);
      return;
    }
  
    if (!/(?=.*\d)/.test(password)) {
      Alert.alert('Error', 'Password should contain at least one number');
      setPasswordError(true);
      return;
    }
  
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      Alert.alert('Error', 'Password should contain at least one special character');
      setPasswordError(true);
      return;
    }
  
    if (password !== retypePassword) {
      Alert.alert('Error', 'Passwords do not match');
      setPasswordError(true);
      setRetypePasswordError(true);
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
       <Header>
        <HeaderText>Sign up</HeaderText>
      </Header>
      <ScrollView>
        <FieldContainer>
        <LabelContainer>
          <Label>First Name</Label>
        </LabelContainer>
        <Input
          value={firstName}
          onChangeText={setFirstName}
          onFocus={() => setFirstNameFocus(true)}
          onBlur={() => setFirstNameFocus(false)}
          isFocused={firstNameFocus}
          error={firstNameError}
          placeholder="Enter your first name"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <LabelContainer>
          <Label>Last Name</Label>
        </LabelContainer>
        <Input
          value={lastName}
          onChangeText={setLastName}
          onFocus={() => setLastNameFocus(true)}
          onBlur={() => setLastNameFocus(false)}
          isFocused={lastNameFocus}
          error={lastNameError}
          placeholder="Enter your last name"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <LabelContainer>
          <Label>Mobile Number</Label>
        </LabelContainer>
        <Input
          value={mobileNumber}
          onChangeText={setMobileNumber}
          onFocus={() => setMobileNumberFocus(true)}
          onBlur={() => setMobileNumberFocus(false)}
          isFocused={mobileNumberFocus}
          error={mobileNumberError}
          placeholder="Enter your mobile number"
          placeholderTextColor="#c0c0c0"
        />
      </FieldContainer>

      <FieldContainer>
        <LabelContainer>
          <Label>Email</Label>
        </LabelContainer>
        <Input
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          isFocused={emailFocus}
          error={emailError}
          placeholder="Enter your email"
          placeholderTextColor="#c0c0c0"
/>
      </FieldContainer>

      <FieldContainer>
        <LabelContainer>
          <Label>Password</Label>
        </LabelContainer>
        <Input
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            isFocused={passwordFocus}
            error={passwordError}
            secureTextEntry={!showPassword}
            placeholder="Enter your password"
            placeholderTextColor="#c0c0c0"
/>

        <ToggleVisibilityButton onPress={togglePasswordVisibility}>
          <ButtonText>{showPassword ? '👁' : '👁‍🗨'}</ButtonText>
        </ToggleVisibilityButton>
      </FieldContainer>

      <FieldContainer>
        <LabelContainer>
          <Label>Retype Password</Label>
        </LabelContainer>
        <Input
            value={retypePassword}
            onChangeText={setRetypePassword}
            onFocus={() => setRetypePasswordFocus(true)}
            onBlur={() => setRetypePasswordFocus(false)}
            isFocused={retypePasswordFocus}
            error={retypePasswordError}
            secureTextEntry={!showPassword}
            placeholder="Retype your password"
            placeholderTextColor="#c0c0c0"
/>
      </FieldContainer>

      <SubmitButton onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </SubmitButton>
      </ScrollView>
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

const LabelContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #000;
`;

const Input = styled.TextInput`
   border-width: 1px;
  border-color: ${props =>
     props.error ? 'red' : (props.isFocused ? 'blue' : '#c0c0c0')};
  border-radius: 4px;
  padding: 5px;
  font-size: 16px;
  color: #000;
  width: 100%;
  text-align: left;
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
const Header = styled.View`
  height: 35px;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const HeaderText = styled.Text`
  color: #005DA9;
  font-size: 24px;
  font-weight: bold;
`;
const ToggleVisibilityButton = styled.TouchableOpacity`
  background-color: #fff;
  position: absolute;
  top: 30px;
  right: 10px;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;


const VisibilityButtonText = styled.Text`
color: #005DA9;
font-size: 14px;
`;

export default SignupPage;