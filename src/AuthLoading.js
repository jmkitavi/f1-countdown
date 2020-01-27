import React from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)

    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = true
    this.props.navigation.navigate(userToken ? 'Home' : 'Login')
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
})

export default AuthLoadingScreen