// ReactotronConfig.ts
import Reactotron from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({name: 'React Native Demo', host: '192.168.1.162'}) // опционально: настройте имя и параметры
  .useReactNative()
  .use(reduxPlugin()) // Добавляем плагин Redux
  .connect();

export default reactotron;
