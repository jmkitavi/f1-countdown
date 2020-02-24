import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native'
import CountDown from 'react-native-countdown-component'
import axios from 'axios'
import moment from 'moment'
import LottieView from 'lottie-react-native'
import Swiper from 'react-native-swiper'

import BottomPanel from './BottomPanel'
import RaceDetails from './RaceDetails'


const Home = () => {
  const [started, setStarted] = useState(false)
  const [nextRound, setNextRound] = useState(null)
  const [race, setRace] = useState(null)
  const [raceTime, setRaceTime] = useState('')
  const [prevRace, setPrevRace] = useState(null)
  const [swiperIndex, setSwiperIndex] = useState(1)

  useEffect(() => {
    if (!race) {
      axios.get('https://ergast.com/api/f1/2020/next.json')
        .then(res => {
          setRace(res.data.MRData.RaceTable.Races[0])
          setNextRound(res.data.MRData.RaceTable.Races[0].round)
          setRaceTime(moment(`${res.data.MRData.RaceTable.Races[0].date} ${res.data.MRData.RaceTable.Races[0].time}`).format())
          fetchPrevRace(2019, res.data.MRData.RaceTable.Races[0].Circuit.circuitId)
        })
        .catch(err => console.log('err HAPA', { ...err }))
    }
  })
  
  fetchPrevRace = (year, circuitId) => {
    axios.get(`https://ergast.com/api/f1/${year}/circuits/${circuitId}/results.json`)
      .then(res => {
        setPrevRace(res.data.MRData.RaceTable.Races[0])
      })
      .catch(err => console.log('err HAPA', { ...err }))
  }

  passRace = (race) => {
    setRace(race)
    setRaceTime(moment(`${race.date} ${race.time}`).format())
    fetchPrevRace(2019, race.Circuit.circuitId)
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden
        backgroundColor='black'
        barStyle='light-content'
      />

      <Swiper
        showsButtons={false}
        loop={false}
        index={swiperIndex}
        containerStyle={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start' }}
        activeDotColor={'white'}
        dotColor={'gold'}
        paginationStyle={{
          bottom: Dimensions.get('window').height - 30,
        }}
        showsButtons
        buttonWrapperStyle={{ top: -(Dimensions.get('window').height / 3) - 80 }}
        prevButton={(
          <View style={{ width: '100%', flexDirection: 'row', left: -20, alignItems: 'flex-start' }}>
            <LottieView source={require('./back.json')} autoPlay loop={true} speed={.3} style={{ height: 55, width: 40, top: -7 }} />
            <Text style={styles.navText}> {swiperIndex !== 1 ? 'Back' : ' Race Details' } </Text>
          </View>
        )}
        nextButton={(
          <View style={{ width: '100%', flexDirection: 'row', right: -18, alignItems: 'flex-end', transform: [{ rotate: '180deg' }] }}>
            <LottieView source={require('./back.json')} autoPlay loop={true} speed={.3} style={{ height: 55, width: 40, top: -1 }} />
            <Text style={[ styles.navText, { transform: [{ rotate: '180deg' }]} ]}> {swiperIndex !== 1 ? 'Back' : 'Standings' } </Text>
          </View>
        )}
        onIndexChanged={(index) => setSwiperIndex(index)}
      >

        {race ?
          <RaceDetails race={race} prevRace={prevRace} fetchPrevRace={fetchPrevRace} /> :
          <View style={{ flex: 1, backgroundColor: 'black' }}>
            <LottieView source={require('./loading.json')} autoPlay loop style={{ height: 100, width: 100 }} />
          </View>
        }

        <View style={styles.container}>

          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/799px-F1.svg.png' }}
            style={{ width: '80%', flex: 2, top: -20, backgroundColor: 'black' }}
            resizeMode='contain'
          />

          <View style={{ flex: 1, alignItems: 'center', top: -20 }}>
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

        <View style={{ flex: 1, backgroundColor: 'yellow' }} />

      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 50
  },
  navText: {
    color: 'white',
    fontFamily: 'Formula1-Regular',
    fontSize: 12,
    lineHeight: 30,
    left: -10,
  },
})

export default Home
