module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@components': ['./src/components'],
          '@screens': ['./src/screens'],
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
