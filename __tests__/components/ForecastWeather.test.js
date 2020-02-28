import React from 'react';
import {cleanup, render} from '@testing-library/react-native';
import 'jest-styled-components';

import {setCurrentForecast} from '../../src/utils/functions';

import ForecastWeather from '../../src/components/ForecastWeather';
import forecast from '../../__mocks__/forecast.json';

describe('Forecasts weather Component', () => {
  const props = {
    units: true,
    forecast: setCurrentForecast(forecast),
  };

  describe('Renders Todays weather', () => {
    afterEach(cleanup);

    it('should render the component', () => {
      const {container} = render(<ForecastWeather {...props} />);
    });
  });
});
