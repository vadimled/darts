// ReactotronConfig.js
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

if (__DEV__) {
  Reactotron.configure({name: 'React Native Demo'}) // defaults to localhost
    .useReactNative() // add all built-in react native plugins
    .use(reactotronRedux()) // if you use Redux
    .connect(); // let's connect!

  console.tron = Reactotron;
}
