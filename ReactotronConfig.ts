import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'Darts', host: '192.168.1.162'})
  .useReactNative()
  .use(reactotronRedux())
  .connect();

Reactotron.clear();

console.tron = Reactotron;

export default Reactotron;
