import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { AuthContext } from '../../utils/authContext'

const SignInScreen = () => {

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button title="Sign in" onPress={() => signIn()} />
    </View>
  );
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
})