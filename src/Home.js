import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native'
import CountDown from 'react-native-countdown-component'
import axios from 'axios'
import moment from 'moment'
import LottieView from 'lottie-react-native'

import BottomPanel from './BottomPanel'


const Home = () => {
  const [started, setStarted] = useState(false)
  const [nextRound, setNextRound] = useState(null)
  const [race, setRace] = useState(null)
  const [raceTime, setRaceTime] = useState('')

  useEffect(() => {
    if (!race) {
      axios.get('https://ergast.com/api/f1/2020/next.json')
        .then(res => {
          setRace(res.data.MRData.RaceTable.Races[0])
          setNextRound(res.data.MRData.RaceTable.Races[0].round)
          setRaceTime(moment(`${res.data.MRData.RaceTable.Races[0].date} ${res.data.MRData.RaceTable.Races[0].time}`).format())
        })
        .catch(err => console.log('err HAPA', { ...err }))
    }
  })
  
  passRace = (race) => {
    setRace(race)
    setRaceTime(moment(`${race.date} ${race.time}`).format())
  }

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
        {race ?
          (
            <React.Fragment>
              {nextRound === race.round &&
                <Text style={{ color: 'white', fontFamily: 'Formula1-Bold', lineHeight: 30 }}>Next Race</Text>
              }
              <Text style={{ color: 'white', fontFamily: 'Formula1-Wide', lineHeight: 30, fontSize: 20, textTransform: 'uppercase' }}>
                {race.raceName.replace(/Grand Prix/g,'GP')}
              </Text>
              <Text style={{ color: 'white', fontFamily: 'Formula1-Regular', lineHeight: 30 }}> {race.Circuit.circuitName} </Text>
              <Text style={{ color: 'white', fontFamily: 'Formula1-Bold' }}> {moment(raceTime).format('ddd, Do MMM YYYY')} </Text>
              <Text style={{ color: 'white', fontFamily: 'Formula1-Bold' }}> {moment(raceTime).format('hh:mm a')} </Text>
            </React.Fragment>
          ) :
          (
            <LottieView source={require('./loading.json')} autoPlay loop style={{ height: 100, width: 100 }} />
            )
        }
      </View>

      {!started ?
        (
          <CountDown
            until={race && (new Date(raceTime) - new Date()) / 1000}
            onFinish={() => setStarted(true)}
            size={30}
            style={{ flex: 1 }}
            timeLabelStyle={{ color: 'white', fontFamily: 'Formula1-Regular', fontSize: 12 }}
            running={!!raceTime}
          />
        ) :
        (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'Formula1-Bold' }}>Race Started</Text>
          </View>
        )
      }

      <BottomPanel passRace={passRace} />

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
