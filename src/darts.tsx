import React, {ReactElement} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ImageBackground, StyleSheet} from 'react-native';
import DrawerNavigator from '@components/drawerNavigator/drawerNavigator';

// Types for navigation
export type AppStackParamList = {
  Home: undefined;
  Game: undefined;
  Drawer: undefined;
  id?: NavigatorID;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const Darts = (): ReactElement => {
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
        <Stack.Navigator id={undefined} screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{title: 'Menu'}}
          />
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

