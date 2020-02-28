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

  /* box-shadow: 3px; */
`;
const ParentView = styled.View`
  flex: 1;
  justify-content: center;
  ${'' /* align-items: center; */}
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
        {/* console.log(daily); */}
        let key = Object.keys(daily)[0];
        return (
          <StyledView key={key+index}>
            <Text>{key} </Text>
            <Text>Low {convert(daily[key].minTemp)} </Text>
            <Text>High {convert(daily[key].maxTemp)} </Text>
          </StyledView>
        );
      })}
      {/* <Text>{JSON.stringify(forecast, null, 2)}</Text> */}
    </ParentView>
  );
};

export default ForecastWeather;
