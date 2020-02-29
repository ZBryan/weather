# weather
### api constraints
current and 5 dys by city, city id, geo coord, zip
up to 60 calls per min

### How to get icon URL
For code 501 - moderate rain icon = "10d"
URL is
http://openweathermap.org/img/wn/10d@2x.png

# icons are listed here
  **scroll a bit to see `icon list` header
https://openweathermap.org/weather-conditions

I originally wanted to use react-navigation and redux for this app and built it as such. but I ran into massive issues with react-navigation 5x and jest. so I decided I was going to rebuild the app, which since I was rebuilding I decided to remove redux as well to simplify the application as well.

I wanted to utilize react-navigations feature of navigating the the same page, to be able use the same page over and over and use redux to store the search results for multiple cities to reduce api calls.

I have one test failing, it is related to react-native-vecto-icons and loading in fontawesome fonts. I didn't feel that it was worth the time for a sample app to chase down this edge case, this could be solved by not using the library, but I like the circle so I left it

Since the application has been greatly simplified I removed the different pages, and just am loading in the components into the main App component.

I would if I kept going with this application remove the search and units switching into a header component to clean up the main App

api calls are handling just the call of the api, all additional logic is being handled in utils/functions.js

## install
* clone repo
* cd into directory
* npm install
* cd ios
* pod install
* cd ..
* cp sample.env .env
* paste in secret into .env
* npm run ios



