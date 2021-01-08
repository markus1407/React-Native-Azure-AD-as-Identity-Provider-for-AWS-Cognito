import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../utils/authContext'

const SettingScreen = () => {
    const { signOut } = React.useContext(AuthContext);

    const [accessToken, setAccessToken] = React.useState('');
    const [idToken, setIdToken] = React.useState('');
    const [refreshToken, setRefreshToken] = React.useState('');

    AsyncStorage.getItem('accessToken').then(
        (value) => { 
            if(value)  setAccessToken(value)
            else       alert('Failed to fetch the data from storage') 
        }, 
        (error) => console.log("FEHLER" ) 
    );

    AsyncStorage.getItem('idToken').then(
        (value) => { 
            if(value)  setIdToken(value)
            else       alert('Failed to fetch the data from storage') 
        }, 
        (error) => console.log("FEHLER" ) 
    );

    AsyncStorage.getItem('refreshToken').then(
        (value) => { 
            if(value)  setRefreshToken(value)
            else       alert('Failed to fetch the data from storage') 
        }, 
        (error) => console.log("FEHLER" ) 
    );


    return (
        <View style={styles.container}>
            

            <Text>accessToken</Text>
            <Text numberOfLines={1}>{ accessToken }</Text>
            <Text></Text>

            <Text>idToken</Text>
            <Text numberOfLines={1}>{ idToken }</Text>
            <Text></Text>

            <Text>refreshToken</Text>
            <Text numberOfLines={1}>{ refreshToken }</Text>
            <Text></Text>

            <Button title="Logout" onPress={ () => signOut() } />
        </View>
    )
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
      margin: 10
    }
})