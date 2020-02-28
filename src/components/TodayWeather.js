import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';
import {
  getAdjustedDateTime,
  getTime,
  kelvinToF,
  kelvinToC,
  getDayName,
} from '../utils/functions';

import {IMG_BASEURL} from '../utils/constants';

const StyledView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const ParentView = styled.View`
  flex: 1;
  ${'' /* justify-content: center; */}
  align-items: center;
  margin-bottom: 20px
`;
const TodayWeather = ({today, units}) => {
  // let {today, units} = useSelector(state => state.currentInfo);
  let convert = units ? kelvinToF : kelvinToC;
  if (!today) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <ParentView>
      <Text style={{fontSize: 36}}>{today.cityName}</Text>
      <StyledView>
        <Text>{today.weather} </Text>
        <Image
          source={{uri: `${IMG_BASEURL}/${today.weatherIcon}@2x.png`}}
          style={{width: 100, height: 100}}
        />
      </StyledView>
      <Text style={{fontSize: 72}}>{convert(today.temp)}&deg;</Text>
      <Text>Today - {getDayName(getAdjustedDateTime(today.sunrise, today.offset))}</Text>
      <StyledView>
        <Text>High {convert(today.maxTemp)} </Text>
        <Text>Low {convert(today.minTemp)}</Text>
      </StyledView>
      {/* {console.log('offset', today.offset)} */}
      <Text>
        Sunrise {getTime(getAdjustedDateTime(today.sunrise, today.offset))}
      </Text>
      <Text>
        Sunset {getTime(getAdjustedDateTime(today.sunset, today.offset))}
      </Text>

      {/* <Text>{JSON.stringify(today, null, 2)}</Text> */}
    </ParentView>
  );
};

export default TodayWeather;
