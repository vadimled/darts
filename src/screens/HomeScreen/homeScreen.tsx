import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Text, View, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '../../darts';
import {setUsername} from '../../store/userSlice';
import UsernameSelector from '@components/select/usernameSelector';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);

  const handleSelectUsername = (name: string) => {
    dispatch(setUsername(name));
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Selected Username: {username}</Text>
      <UsernameSelector
        isVisible={modalVisible}
        onSelect={handleSelectUsername}
      />

      <Button title="Start Game" onPress={() => navigation.navigate('Game')} />
    </View>
  );
};

export default HomeScreen;
