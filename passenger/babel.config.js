module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ['module:react-native-dotenv', { // Pass options as an array
          moduleName: '@env',
          path: '.env',
        }],
      ],
    };
  };
  