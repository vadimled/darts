import React, {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import GameScreen from '@screens/GameScreen';
import TrainingScreen from "@screens/TrainingScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator
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
