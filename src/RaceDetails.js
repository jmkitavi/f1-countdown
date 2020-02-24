import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import LottieView from 'lottie-react-native'
import moment from 'moment'
import { Dropdown } from 'react-native-material-dropdown'


// Source: wikipedia + f1.fandom.com
const trackImages = {
  'albert_park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Albert_Lake_Park_Street_Circuit_in_Melbourne%2C_Australia.svg/800px-Albert_Lake_Park_Street_Circuit_in_Melbourne%2C_Australia.svg.png',
  'bahrain': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Bahrain_International_Circuit--Grand_Prix_Layout.svg/1280px-Bahrain_International_Circuit--Grand_Prix_Layout.svg.png',
  'hanoi': 'https://vignette.wikia.nocookie.net/f1wikia/images/2/2d/Hanoi_Street_Circuit_2020.png',
  'shanghai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Shanghai_International_Racing_Circuit_track_map.svg/1280px-Shanghai_International_Racing_Circuit_track_map.svg.png',
  'zandvoort': 'https://vignette.wikia.nocookie.net/f1wikia/images/0/09/Circuit_Zandvoort.png',
  'catalunya': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Formula1_Circuit_Catalunya.svg/1920px-Formula1_Circuit_Catalunya.svg.png',
  'monaco': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Monte_Carlo_Formula_1_track_map.svg/1280px-Monte_Carlo_Formula_1_track_map.svg.png',
  'BAK': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Formula1_Circuit_Baku.svg/1024px-Formula1_Circuit_Baku.svg.png',
  'villeneuve': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Circuit_Gilles_Villeneuve.svg/1920px-Circuit_Gilles_Villeneuve.svg.png',
  'ricard': 'https://upload.wikimedia.org/wikipedia/commons/3/39/Circut_Paul_Ricard_2018_layout_map.png',
  'red_bull_ring': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Circuit_Red_Bull_Ring.svg/1024px-Circuit_Red_Bull_Ring.svg.png',
  'silverstone': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Circuit_Silverstone_2011.svg/1024px-Circuit_Silverstone_2011.svg.png',
  'hungaroring': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Hungaroring.svg/800px-Hungaroring.svg.png',
  'spa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Spa-Francorchamps_of_Belgium.svg/1280px-Spa-Francorchamps_of_Belgium.svg.png',
  'monza': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Monza_track_map.svg/1920px-Monza_track_map.svg.png',
  'marina_bay': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Singapore_Street_Circuit_2015.svg/1920px-Singapore_Street_Circuit_2015.svg.png',
  'sochi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Circuit_Sochi.svg/1280px-Circuit_Sochi.svg.png',
  'suzuka': 'https://upload.wikimedia.org/wikipedia/commons/7/79/Circuit_Suzuka.png',
  'americas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Austin_circuit.svg/800px-Austin_circuit.svg.png',
  'rodriguez': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg/1024px-Aut%C3%B3dromo_Hermanos_Rodr%C3%ADguez_2015.svg.png',
  'interlagos': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/2014_Interlagos_circuit_map.svg/1920px-2014_Interlagos_circuit_map.svg.png',
  'yas_marina': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Circuit_Yas-Island.svg/1920px-Circuit_Yas-Island.svg.png',
}

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

const RaceDetails = ({ race, prevRace, fetchPrevRace }) => {
  const [imageHeight, setImageHeight] = useState(null)
  const [visible, setVisible] = useState(false) // for Image Viewer

  useEffect(() => {
    if (!imageHeight) {
      Image.getSize(trackImages[race.Circuit.circuitId], (width, height) => {
        setImageHeight(Dimensions.get('window').width * (height / width))
      })
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 50 }}>
      <StatusBar
        hidden
        backgroundColor='black'
        barStyle='light-content'
      />

      {!race ? (
        <LottieView source={require('./loading.json')} autoPlay loop style={{ height: 100, width: 100 }} />
      ) : (
        <React.Fragment>

          <Text style={[styles.raceName, { backgroundColor: 'transparent' }]}>
            {race.raceName.replace(/Grand Prix/g,'GP')}
          </Text>

          <ScrollView contentContainerStyle={styles.container}>

            <Text style={{ fontFamily: 'Formula1-Regular', color: 'white', fontSize: 12, textAlign: 'right', lineHeight: 13 }}> {race.Circuit.circuitName} </Text>
            <Text style={{ fontFamily: 'Formula1-Regular', color: 'white', fontSize: 10, textAlign: 'right', lineHeight: 11 }}> {race.Circuit.Location.locality}, {race.Circuit.Location.country}</Text>

            <View style={{ width: '100%', borderRadius: 10, overflow: 'hidden', backgroundColor: '#D8D8D8', marginVertical: 4 }}>
              {imageHeight &&
                <TouchableWithoutFeedback
                  onPress={() => setVisible(true)} // for Image Viewer
                >
                  <Image
                    source={{ uri: trackImages[race.Circuit.circuitId] }}
                    style={{ width: '100%', height: imageHeight }}
                    resizeMode='center'
                  />
                </TouchableWithoutFeedback>
              }
            </View>

            <View>
              <Text style={styles.cText}>Season:  <Text style={{ fontSize: 14 }}> {race.season}</Text></Text>
              <Text style={styles.cText}>Round:    <Text style={{ fontSize: 14 }}> {race.round}</Text></Text>
              <Text style={styles.cText}>Date:       <Text style={{ fontSize: 14 }}> {moment(`${race.date} ${race.time}`).format('ddd, Do MMM YYYY')}</Text></Text>
              <Text style={styles.cText}>Time:       <Text style={{ fontSize: 14 }}> {moment(`${race.date} ${race.time}`).format('hh:mm a')}</Text></Text>
            </View>

            <View style={styles.prevHeader}>
              <Text style={[styles.cText, { fontSize: 13}]}> Previous Results </Text>

              <Dropdown
                label='Year'
                data={years}
                value={prevRace ? prevRace.season : '2019'}
                onChangeText={(text) => {
                  fetchPrevRace(text, race.Circuit.circuitId)
                }}
                baseColor='white'
                containerStyle={{ width: 90 }}
                textColor='white'
                selectedItemColor='black'
                itemTextStyle={{ fontFamily: 'Formula1-Regular', fontSize: 10 }}
                itemPadding={0}
                itemCount={5}
                dropdownOffset={{ top: 32, left: 0 }}
              />
            </View>
            
            {prevRace && prevRace.Results.map((pos) =>
              <View style={styles.driver}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.name}><Text style={{ fontSize: 6 }}>{pos.grid}</Text> {pos.position} </Text>
                  <Text style={styles.name}>
                    {pos.Driver.givenName} {pos.Driver.familyName}  •  {pos.Driver.permanentNumber}
                  </Text>
                </View>
                {pos.Time ?
                  <Text style={[styles.name, { textAlign: 'right' }]}> {pos.Time.time} </Text> :
                  pos.status && <Text style={[styles.name, { textAlign: 'right' }]}> {pos.status} </Text>
                }
              </View>
            )}

            {/* <View style={{ flex: 1, height: 500}}></View> */}

          </ScrollView>
        </React.Fragment>
      )}



    </View>
  )
}

const styles = StyleSheet.create({
  raceName: {
    color: 'white',
    fontFamily: 'Formula1-Wide',
    fontSize: 20,
    top: -10,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  container: {
    backgroundColor: 'black',
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
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    top: -20,
  },
  driver: {
    flex: 1,
    flexDirection: 'row',
    borderTopColor: '#303030',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  name: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Formula1-Regular',
    marginHorizontal: 10,
    lineHeight: 30,
  },
})

export default RaceDetails
