import React from 'react';
import {cleanup, render} from '@testing-library/react-native';


import TodayWeather from '../../src/components/TodayWeather';
import today from '../../__mocks__/today.json'

describe('Todays weather Component', () => {
  const props = {
    units: true,
    today
  };

  describe('Renders Todays weather', () => {
    afterEach(cleanup);

    it('should render the component', () => {
      const {container} = render(<TodayWeather {...props}/>);
      expect(container).toMatchSnapshot();
    });
  });
});
