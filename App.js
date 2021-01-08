/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet
} from 'react-native';

// React Native Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the screens
import SettingsScreen from './app/screens/SettingsScreen';
import LoadingScreen from './app/screens/General/LoadingScreen'
import SignInScreen from './app/screens/Auth/SignInScreen';

import { AuthContext } from './app/utils/authContext'

import { SignInAsync, SignOutAsync } from './app/utils/AuthManager'

const Stack = createStackNavigator();

const App = () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignIn: false,
            accessToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            accessToken: null,
          };
        case 'accessTokenRestoring':
          return {
            ...prevState,
            isLoading: false,
            accessToken: action.accessToken
          }
        default:
          throw new Error();
      }
    },
    {
      isLoading: true,
      isLogedIn: false,
      accessToken: null
    }
  );

  React.useEffect ( () => {
      
      const fetchaccessToken = async () => {
        let accessToken;

        try {
          accessToken = await AsyncStorage.getItem('accessToken');

          console.log("User Token"+ accessToken);
        } catch(e) {
          // Restoring token failed
        }

        dispatch({ type: 'accessTokenRestoring', accessToken: accessToken });
      };
      
      fetchaccessToken();
    },
    []  
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        await SignInAsync();  // call the SignIn function in AuthManager.js

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async () => {
        await SignOutAsync();

        dispatch({ type: 'SIGN_OUT' })
      } 
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ?
              (
                // We haven't finished checking for the token yet
                <Stack.Screen name="Loading" component={LoadingScreen} />
              )
              :
              state.accessToken == null ?
                (
                  // We haven't finished checking for the token yet
                  <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }}  />
                ) 
                : 
                (
                  // We haven't finished checking for the token yet
                  <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
                )
            }

          </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;