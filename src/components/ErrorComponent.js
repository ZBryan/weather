import React from 'react';
import {View, Text, Image} from 'react-native';
import styled from 'styled-components/native';

const ErrorComponent = ({city}) => {
  return (
    <View>
      <Text>Please try a different city, could not find any results for {city}</Text>
    </View>
  );
};

export default ErrorComponent;
