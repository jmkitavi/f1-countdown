import React from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

const Login = () => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
})

export default Login
