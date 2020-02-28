import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import {
  getAdjustedDateTime,
  kelvinToF,
  kelvinToC,
  getDayName,
} from '../utils/functions.js';

import {IMG_BASEURL} from '../utils/constants.js';

const StyledView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  justify-content: space-around
  /* box-shadow: 3px; */
`;
const ParentView = styled.View`
  flex: 1;
  justify-content: center;
`;
const ForecastWeather = ({forecast, units}) => {
  // let {forecast, units} = useSelector(state => state.currentInfo);
  // console.log('forcast', forecast);
  let convert = units ? kelvinToF : kelvinToC;
  if (!forecast) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <ParentView>
      {forecast.map((daily, index) => {
        return (
          <StyledView key={index}>
            <Text>{daily.day} </Text>
            <Text>Low {convert(daily.minTemp)} </Text>
            <Text>High {convert(daily.maxTemp)} </Text>
            <Image
              source={{uri: `${IMG_BASEURL}/${daily.weatherIcon}@2x.png`}}
              style={{width: 50, height: 50}}
            />
          </StyledView>
        );
      })}
    </ParentView>
  );
};

export default ForecastWeather;
