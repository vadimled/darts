import React, {ReactElement, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImageBackground, StyleSheet} from 'react-native';
import HomeScreen from '@screens/HomeScreen';
import GameScreen from '@screens/GameScreen';
import io from 'socket.io-client';
import {useActions} from './store/hooks';
import { useDispatch } from "react-redux";
// import {trackGlobalLogs} from 'reactotron-react-native';

// Подключение к сокету
const socket = io('http://192.168.1.162:3000');

// Types for navigation
export type AppStackParamList = {
  Home: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator();
const Darts = (): ReactElement => {
  const {setConnectionStatus} = useActions();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('usersCount', (data: {count: number}) => {
      console.log('someone connected << infinite loop');

      if (data.count > 1) {
        dispatch(setConnectionStatus(true));
      } else {
        dispatch(setConnectionStatus(false));
      }
    });

    return () => {
      socket.off('usersCount');
    };
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };
  const backgroundImage = require('./assets/background.png');
  return (
    <ImageBackground
      style={styles.background}
      source={backgroundImage}
      resizeMode="stretch">
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default Darts;
