import axios from 'axios';
import {API_KEY} from 'react-native-dotenv';

import { BASEURL} from '../utils/constants';
import {setCurrentForecast, setCurrentWeather} from '../utils/functions'

export const getWeatherForecast = (city = 'seattle') => {
  let address = `${BASEURL}/forecast?q=${city}&appid=${API_KEY}`;
  return axios
    .get(address)
    .then(res => {
      return setCurrentForecast(res.data)})
    .catch(error => {
      // console.log(`err`)
      throw new Error({address, error});
    });
};

export const getCurrentWeather = (city = 'seattle') => {
  let address = `${BASEURL}/weather?q=${city}&appid=${API_KEY}`;
  return axios
    .get(address)
    .then(({data}) => {
        return setCurrentWeather(data)
    })
    .catch(error => {
      // console.log(`error there`)
      throw new Error({address, error});
    });
};
