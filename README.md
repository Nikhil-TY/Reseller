# Reseller

The project is a React Native application that implements a navigation system using React Navigation and Firebase for authentication. The app provides functionality for user login, signup, and navigation between different screens.

## Installation

To run the project locally, follow these steps:

1.  Clone the repository: `git clone https://github.com/Nikhil-TY/Reseller.git`
2.  Install dependencies: `npm install`
3.  Configure Firebase:
    -   Create a Firebase project on the Firebase console.
    -   Copy the Firebase project configuration object and replace it in the `firebaseConfig` variable in the `App.js` file.
    -   Enable Firebase Authentication with the necessary authentication providers.
4.  Run the app in android: `npm react-native run android`

## Dependencies

The project relies on the following dependencies:

-   @react-native-async-storage/async-storage: ^1.18.2
-   @react-native-community/cli-platform-android: ^11.3.3
-   @react-native-community/cli-platform-ios: ^11.3.3
-   @react-native-community/masked-view: ^0.1.11
-   @react-native-firebase/app: ^18.0.0
-   @react-native-firebase/auth: ^18.0.0
-   @react-native-firebase/firestore: ^18.0.0
-   @react-native-picker/picker: ^2.4.10
-   @react-navigation/drawer: ^6.6.3
-   @react-navigation/native: ^6.1.7
-   @react-navigation/stack: ^6.3.16
-   firebase: ^9.22.2
-   react: 18.2.0
-   react-native: 0.71.11
-   react-native-gesture-handler: ^2.12.0
-   react-native-reanimated: ^3.3.0
-   react-native-safe-area-context: ^4.6.3
-   react-native-screens: ^3.22.0
-   react-native-splash-screen: ^3.3.0
-   react-native-svg: ^13.9.0
-   react-native-vector-icons: ^9.2.0
-   react-navigation-stack: ^2.10.4
-   react-pro-sidebar: ^1.1.0-alpha.1
-   react-router: ^6.14.0
-   styled-components: ^4.1.3

Make sure to have these dependencies installed in your project by running `npm install`.

## Node.js and npm Versions

The project is developed using the following versions of Node.js and npm:

-   Node.js: 18.16.0
-   npm: 9.7.1

Make sure you have Node.js and npm installed with the specified versions in order to ensure compatibility with the project.


## Usage

The entry point of the application is the `App` component in the `App.txs` file. The `App` component sets up the navigation system and renders different screens based on the user's actions.

The app supports the following screens:

-   `LoginPage`: Allows users to log in to the app.
-   `SignupPage`: Allows new users to create an account.
-   `HomePage`: Displays the home screen with customized header and navigation drawer.
-   `OrdersPage`: Displays the orders screen with a customized header.

The navigation between screens is handled using the React Navigation library.

