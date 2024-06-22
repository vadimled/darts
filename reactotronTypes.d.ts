// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {ReactotronReactNative} from 'reactotron-react-native';

declare module 'reactotron-react-native' {
  interface ReactotronReactNative {
    createEnhancer: () => any;
  }
}

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}
