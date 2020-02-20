import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import LottieView from 'lottie-react-native'
import BottomDrawer from 'rn-bottom-drawer'
// import BottomDrawer from 'rn-bottom-sheet'
import axios from 'axios'

const BottomPanel = ({ passRace }) => {
  const [open, setOpen] = useState(false)
  const [races, setRaces] = useState(null)

  useEffect(() => {
    if (!races) {
      axios.get('https://ergast.com/api/f1/2020.json')
        .then(res => {
          setRaces(res.data.MRData.RaceTable.Races)
        })
        .catch(err => console.log('err HAPA', { ...err }))
    }
  })

  return (
      <BottomDrawer
        startUp={false}
        containerHeight={300}
        backgroundColor='black'
        onExpanded = {() => setOpen(true)}
        onCollapsed = {() => setOpen(false)}
        downDisplay={240}
      >
        
        <View
          style={[
            styles.container,
            open && { backgroundColor: '#222222' }
          ]}
        >

          <View style={{ top: -10 }}>
            <View
              style={open && {
                transform: [{
                  rotate: '-180deg'
                }]
              }}
            >
              <LottieView source={require('./up.json')} autoPlay loop style={{ height: 70, width: 70 }} />
            </View>
            {!open && <Text style={{ color: 'white', fontFamily: 'Formula1-Bold', top: -20 }}> More Races </Text>}
          </View>

          <ScrollView
            style={styles.content}
          >
            <TouchableOpacity>
              {races && races.map(race =>
                <TouchableOpacity
                  key={race.round}
                  style={styles.race}
                  onPress={() => passRace(race)}
                >
                  <Text style={styles.raceName}>{race.raceName}</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </ScrollView>

        </View>
      </BottomDrawer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    width: '100%',
    top: -25,
    borderTopColor: 'black',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  race: {
    backgroundColor: '#404040',
    padding: 2,
    marginVertical: 3,
    marginHorizontal: 4,
    borderRadius: 3
  },
  raceName: {
    fontFamily: 'Formula1-Regular',
    color: 'white',
    lineHeight: 30,
    textAlign: 'center',
  },

})

export default BottomPanel
