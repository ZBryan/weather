import React from 'react';
import {cleanup, render} from '@testing-library/react-native';
import dayjs from 'dayjs';

import {
  setCurrentForecast,
  setCurrentWeather,
  getAdjustedDateTime,
  getDayName,
  getTime,
  getMinMaxWeather,
  kelvinToC,
  kelvinToF,
} from '../../src/utils/functions';

import ForecastWeather from '../../src/components/ForecastWeather';
import forecast from '../../__mocks__/forecast.json';
import today from '../../__mocks__/today.json';

describe('function validation', () => {
  const props = {
    units: true,
    forecast: setCurrentForecast(forecast),
    today: setCurrentWeather(today)
  };
  let unixDate = 1582865321; //2020-02-27T20:48:41-08:00
  let d = dayjs.unix(unixDate);
  let seattleOffset = -28800 //provided from api
  let beijingOffset = 28800 //provided from api

  it('should return temp in C', () => {
    expect(kelvinToC(273.15)).toBe(0);
  });
  it('should return temp in C', () => {
    expect(kelvinToC(278.65)).toBe(5.5);
  });
  it('should return temp in F', () => {
    expect(kelvinToF(273.15)).toBe(32);
  });
  it('should return the time in h:mm am/pm format', () => {
    expect(getTime(d)).toBe('8:48 pm');
  });
  it('should return the name of the day of the week', () => {
    expect(getDayName(d)).toBe('Thursday');
  });
  describe('today should be parsed correcly', ()=>{
    const current = props.today

    it('should have keys', ()=>{
      expect(current.hasOwnProperty('sunrise')).toBe(true)
      expect(current.hasOwnProperty('sunset')).toBe(true)
      expect(current.hasOwnProperty('cityName')).toBe(true)
      expect(current.hasOwnProperty('minTemp')).toBe(true)
      expect(current.hasOwnProperty('maxTemp')).toBe(true)
      expect(current.hasOwnProperty('temp')).toBe(true);
      expect(current.hasOwnProperty('weather')).toBe(true);
      expect(current.hasOwnProperty('weatherIcon')).toBe(true);
      expect(current.hasOwnProperty('offset')).toBe(true);
      expect(current.hasOwnProperty('RandomNoValid')).toBe(false);

    })
  })

  describe('forecast should have correct keys', ()=>{
    const future = props.forecast
    it('should have a length of 4', ()=>{
      expect(future.length).toBe(4)
    })
    it('should have keys', ()=>{
      const day = future[2] // aribtrary middle day could be any day in set
         expect(day.hasOwnProperty('minTemp')).toBe(true);
         expect(day.hasOwnProperty('maxTemp')).toBe(true);
         expect(day.hasOwnProperty('weather')).toBe(true);
         expect(day.hasOwnProperty('weatherIcon')).toBe(true);
         expect(day.hasOwnProperty('day')).toBe(true);

    })
  })

  describe('should handle offset', ()=>{
    it('should return the correct time given an offset, seattle/beijing', ()=>{
      expect(getTime(getAdjustedDateTime(unixDate, seattleOffset))).toBe('8:48 pm')
      //beijing is currently 16 hours ahead of seattle
      expect(getTime(getAdjustedDateTime(unixDate, beijingOffset))).toBe(
        '12:48 pm',
      );
    })
    it('should return the correct day name given an offset, seattle/beijing', () => {
      expect(getDayName(getAdjustedDateTime(unixDate, seattleOffset))).toBe(
        'Thursday',
      );
      //beijing is currently 16 hours ahead of seattle
      expect(getDayName(getAdjustedDateTime(unixDate, beijingOffset))).toBe(
        'Friday',
      );
    });
  })

});
