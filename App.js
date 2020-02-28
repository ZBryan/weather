/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  // Button,
} from 'react-native';
import {Button, CheckBox, Input} from 'react-native-elements';
import  'react-native-vector-icons/FontAwesome5'


import styled from 'styled-components';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ForecastWeather from './src/components/ForecastWeather';
import TodayWeather from './src/components/TodayWeather';

import {getCurrentWeather, getWeatherForecast} from './src/utils/api';
import ErrorComponent from './src/components/ErrorComponent';



const App = () => {
  const [units, setUnits] = useState(true);
  // const input = React.createRef();
  const [cityName, setCityName] = useState('seattle');
  const [forecast, setForecast] = useState();
  const [today, setToday] = useState();
  const [error, setError] = useState();

  const getWeather = async () => {
      setError(false)
      // console.log(`cityName`, cityName)
      getCurrentWeather(cityName).then(res => {

          setToday(res)
      }).catch(err=>{
        // console.log(err)
        setError(true);
      });
      getWeatherForecast(cityName).then(res => setForecast(res)).catch(err=>{
setError(true);
      });
  };
  const handlePress = () => {
    getWeather();
  };
  useEffect(() => {
    getWeather();
    return () => {};
  }, []);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View
            style={{
              ...styles.sectionContainer,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Input
              label="Search by City Name"
              inputContainerStyle={{width: '80%'}}
              value={cityName}
              onChangeText={city => {
                setCityName(city);
              }}
            />
            <Button title="Go" onPress={handlePress}></Button>
          </View>
          <View>
            <CheckBox
              title={units ? 'F' : 'C'}
              checked={units}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              onPress={() => {
                setUnits(!units);
              }}
            />
          </View>
          <View style={styles.body}>
            {error ? (
              <ErrorComponent />
            ) : (
              <>
                <TodayWeather today={today} units={units} />
                <ForecastWeather forecast={forecast} units={units} />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
