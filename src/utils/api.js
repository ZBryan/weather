import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

import { BASEURL} from '../utils/constants';
import {setCurrentForecast} from '../utils/functions'

export const getWeatherForecast = (city = 'seattle') => {
  let address = `${BASEURL}/forecast?q=${city}&appid=${API_KEY}`;
  return axios
    .get(address)
    .then(res => {
      return setCurrentForecast(res.data)})
    .catch(error => {
      console.log(`err`)
      throw new Error({address, error});
    });
};

export const getCurrentWeather = (city = 'seattle') => {
  let address = `${BASEURL}/weather?q=${city}&appid=${API_KEY}`;
  return axios
    .get(address)
    .then(({data}) => {

      console.log(`hi there`)
      let {sys, weather, main} = data;
      return {
        sunrise: sys.sunrise,
        sunset: sys.sunset,
        cityName: data.name,
        minTemp: main.temp_min,
        maxTemp: main.temp_max,
        temp: main.temp,
        weather: weather[0].main,
        weatherIcon: weather[0].icon,
        offset: data.timezone,
      };
    })
    .catch(error => {
      console.log(`error there`)
      throw new Error({address, error});
    });
};
