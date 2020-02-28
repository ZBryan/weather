// helper functions
import dayjs from 'dayjs';

export const kelvinToC = tempK => {
  // allowing 1 decimal for deg C, would be good to not show if the decimal is 0 ie 0.0 it just 0 but 2.5 would stay that way
  return Number((tempK - 273.15).toFixed(1));
};

export const kelvinToF = tempK => {
  return parseInt(kelvinToC(tempK) * (9 / 5) + 32, 10);
};

export const getAdjustedDateTime = (ticks, offset) => {
  //ticks are the  provided by the api ticks are given in unix tiem stamp
  //offset is the offset from GMT for the location listed in api as city.timezone
  const localOffset = dayjs().utcOffset() * 60;

  let adjusted = localOffset - offset;
  return dayjs.unix(ticks - adjusted);
};

export const getTime = date => {
  // return time without seconds
  return dayjs(date).format('h:mm a');
};

//function taken from stackoverflow
//https://stackoverflow.com/questions/24998624/day-name-from-date-in-js
export const getDayName = (dateStr, locale = 'en-us') => {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, {weekday: 'long'});
};

export const getMinMaxWeather = daysData => {
  //loops over one day in 5 day forcast to set the min, max, weather, and weatherIcon (last two don't change so first instance is used rather than containtly reassigning)
  let min = 300;
  let max = 0;
  let weather = daysData[0].weather[0].main;
  let weatherIcon = daysData[0].weather[0].icon;
  daysData.map(dayTimeData => {
    let {main} = dayTimeData;
    if (main.temp_min < min) {
      min = main.temp_min;
    }
    if (main.temp_max > max) {
      max = main.temp_max;
    }
  });
  return [min, max, weather, weatherIcon];
};

export const setCurrentWeather = data => {
  // moved logic from api call to make testable
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
};
export const setCurrentForecast = data => {
  const offsetTimeZone = data.city.timezone;
  //5 days of data, every 3 hours, 8 data points per day 40 overall points
  let currentWeather = [];
  let days = data.list;
  for (let i = 7; i < days.length - 1; i += 8) {
    let [minTemp, maxTemp, weather, weatherIcon] = getMinMaxWeather([
      days[i],
      days[i + 1],
      days[i + 2],
      days[i + 3],
      days[i + 4],
      days[i + 5],
      days[i + 6],
      days[i + 7],
    ]);
    let day = getDayName(getAdjustedDateTime(days[i].dt, offsetTimeZone));

    currentWeather.push({
      day,
      minTemp,
      maxTemp,
      weather,
      weatherIcon,
    });
  }
  return currentWeather;
};
