import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native'
import CountDown from 'react-native-countdown-component'

const Home = () => {
  const [started, setStarted] = useState(false)

  return (
    <View style={styles.container}>
      <StatusBar
        hidden
        backgroundColor='black'
        barStyle='light-content'
      />

      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/799px-F1.svg.png' }}
        style={{ width: '80%', flex: 2 }}
        resizeMode='contain'
      />

      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontFamily: 'Formula1-Bold', lineHeight: 30 }}>Next Race</Text>
        <Text style={{ color: 'white', fontFamily: 'Formula1-Wide', lineHeight: 30, fontSize: 20  }}>AUSTRALIAN GP</Text>
        <Text style={{ color: 'white', fontFamily: 'Formula1-Regular' }}>Melbourne Grand Prix Circuit</Text>
        <Text style={{ color: 'white', fontFamily: 'Formula1-Bold' }}>Sun, 15 Mar 2020</Text>
      </View>

      {!started ?
        (
          <CountDown
            until={(new Date("March 15, 2020 8:10:00") - new Date()) / 1000}
            onFinish={() => setStarted(true)}
            size={30}
            style={{ flex: 1 }}
          />
        ) :
        (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'Formula1-Bold' }}>Race Started</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
})

export default Home
