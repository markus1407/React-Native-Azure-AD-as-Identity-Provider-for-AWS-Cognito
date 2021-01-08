import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize } from 'react-native-app-auth';

const configAuthorization  = {
  clientId: '[Client ID]',
  redirectUrl: '[Your redirect URL, e.g. my-app://react-native-auth]',
  serviceConfiguration: { 
    authorizationEndpoint: 'https://[Domain Name].auth.[Region].amazoncognito.com/logout',
    tokenEndpoint: 'https://[Domain Name].auth.[Region].amazoncognito.com/oauth2/token',
  }
};

export const SignInAsync = async () => {

    const result = await authorize(configAuthorization);

    // Store the access token, refresh token, and expiration time in storage
    await AsyncStorage.setItem('accessToken', result.accessToken);
    await AsyncStorage.setItem('idToken', result.idToken);
    await AsyncStorage.setItem('refreshToken', result.refreshToken);
    await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);
}

export const SignOutAsync = async () => {

    // Clear storage
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expireTime');
}
