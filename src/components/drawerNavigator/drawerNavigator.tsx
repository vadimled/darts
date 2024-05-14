import React, {FC} from 'react';
import GameScreen from '@screens/GameScreen';
import HomeScreen from '@screens/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const DrawerNavigator: FC = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: 'slide', // This controls how the drawer looks when it slides out. 'front', 'back', 'slide' are common types
        drawerPosition: 'left', // This determines where the drawer appears on the screen.
        drawerStyle: {
          width: '75%', // Sets the width of the drawer
        },
        drawerActiveTintColor: '#e91e63', // Color for the label when the item is active.
        drawerInactiveTintColor: 'gray', // Color for the label when the item is inactive.
        drawerItemStyle: {marginVertical: 5}, // Margin for each item in the drawer.
      }}>
      <Drawer.Screen
        name="Game"
        component={GameScreen}
        options={{title: 'Game'}}
      />
      <Drawer.Screen
        name="Training"
        component={HomeScreen}
        options={{title: 'Training'}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
