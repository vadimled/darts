import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GameScreen from '../../screens/GameScreen';
import TrainingScreen from '../../screens/TrainingScreen';
import HomeScreen from '../../screens/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="Home"
      screenOptions={{
        drawerType: 'slide',
        drawerPosition: 'left',
        drawerStyle: {
          width: '75%',
        },
        drawerActiveTintColor: '#e91e63',
        drawerInactiveTintColor: 'gray',
        drawerItemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen
        name="Game"
        component={GameScreen}
        options={{title: 'Game'}}
      />
      <Drawer.Screen
        name="Training"
        component={TrainingScreen}
        options={{title: 'Training'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
