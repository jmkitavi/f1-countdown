import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import LottieView from 'lottie-react-native'
import { Dropdown } from 'react-native-material-dropdown'
import axios from 'axios'

const years = [
  { value: 2020 },
  { value: 2019 },
  { value: 2018 },
  { value: 2017 },
  { value: 2016 },
  { value: 2015 },
  { value: 2014 },
  { value: 2013 },
]

const Standings = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [option, setOption] = useState('driverStandings')

  const [driverStandings, setDriverStandings] = useState([])
  const [constructorStandings, setConstructorStandings] = useState([])


  useEffect(() => {
    fetchStandings(year, option)
  }, [])

  const fetchStandings = (year) => {
    // fetch drivers
    axios.get(`https://ergast.com/api/f1/${year}/driverStandings.json`)
      .then(res => {
        setDriverStandings(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
      })
      .catch(err => console.log('err HAPA', err))

    // fetch constructores
    axios.get(`https://ergast.com/api/f1/${year}/constructorStandings.json`)
      .then(res => {
        setConstructorStandings(res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings)
      })
      .catch(err => console.log('err HAPA', err))
  }

  const renderStandings = (standings) => {

    if (standings.length < 1) {
      return (
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
          <LottieView source={require('./loading.json')} autoPlay loop style={{ height: 100, width: 100 }} />
        </View>
      )
    }

    return (
        standings && standings.map((pos) =>
          <View style={styles.driver} key={pos.position}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                {pos.position}
              </Text>
            </View>

            <View style={{ flex: 5 }}>
              <Text style={styles.name}>
                {option === 'driverStandings' ?
                  `${pos.Driver.givenName} ${pos.Driver.familyName}  • ${pos.Driver.permanentNumber}` :
                  pos.Constructor.name
                }
              </Text>
            </View>

            <View style={{ flex: 4 }}>
              <Text style={styles.name}>
                {option === 'driverStandings' ?
                  pos.Constructors[0].name : pos.Constructor.nationality
                }
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { textAlign: 'right' }]}>{pos.points}</Text>
            </View>
          </View>
        )
      
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 50 }}>
      <StatusBar
        hidden
        backgroundColor='black'
        barStyle='light-content'
      />

        <React.Fragment>

          <Text style={[styles.raceName, { backgroundColor: 'transparent' }]}>
            STANDINGS
          </Text>

          <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.resOptContainer}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[
                    styles.resOpt,
                    option !== 'driverStandings' && { backgroundColor: 'transparent' }
                  ]}
                  onPress={() => setOption('driverStandings')}
                >
                  <Text style={[styles.name, { fontSize: 10 }]}>Driver</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.resOpt,
                    option !== 'constructorStandings' && { backgroundColor: 'transparent' }
                  ]}
                  onPress={() => setOption('constructorStandings')}
                >
                  <Text style={[styles.name, { fontSize: 10 }]}>Constructor</Text>
                </TouchableOpacity>
              </View>


              <Dropdown
                data={years}
                value={new Date().getFullYear()}
                onChangeText={(text) => {
                  setYear(text)
                  fetchStandings(text)
                }}
                baseColor='white'
                containerStyle={{ width: 90 }}
                textColor='white'
                selectedItemColor='black'
                itemTextStyle={{ fontFamily: 'Formula1-Regular', fontSize: 10 }}
                itemPadding={0}
                itemCount={5}
                dropdownOffset={{ top: 0, left: 0 }}
                dropdownMargins={{ min: 8, max: 20 }}
                pickerStyle={{ minHeight: 100 }}
              />
            </View>
            
            <View style={{ top: -12 }}>
              {option === 'driverStandings' ?
                renderStandings(driverStandings) :
                renderStandings(constructorStandings)
              }
            </View>

          </ScrollView>
        </React.Fragment>



    </View>
  )
}


let height = Dimensions.get('window').height

const styles = StyleSheet.create({
  raceName: {
    color: 'white',
    fontFamily: 'Formula1-Wide',
    fontSize: 20,
    lineHeight: 25,
    top: -10,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  container: {
    height: height,
    backgroundColor: 'rgba(15, 15, 15, 1)',
    width: '100%',
    paddingBottom: 50,
  },
  cText: {
    color: 'white',
    fontFamily: 'Formula1-Regular',
    fontSize: 10,
    lineHeight: 30,
    marginHorizontal: 10,
  },
  prevHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  driver: {
    flexDirection: 'row',
    borderBottomColor: 'rgba(48, 48, 48, .9)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 1.5,
    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Formula1-Regular',
    marginLeft: 5,
    lineHeight: 30,
  },

  resOptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  resOpt: {
    backgroundColor: 'rgba(41, 176, 255, .9)',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    height: 26,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 15,
  }
})

export default Standings
