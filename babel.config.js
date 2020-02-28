module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
    '@babel/preset-env',
  ],
  plugins: ['babel-plugin-styled-components', 'transform-class-properties'],
};
