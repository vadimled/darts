module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: './',
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': ['./src/components'],
          '@screens': ['./src/screens'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
