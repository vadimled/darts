import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../darts';
import {setUsername} from '../../store/userSlice';
import UsernameSelector from '@components/select/usernameSelector';
import {useAppSelector} from '../../store/hooks';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);
  const isSomeoneConnected = useAppSelector(
    state => state.socket.isSomeoneConnected,
  );

  const handleSelectUsername = (name: string) => {
    dispatch(setUsername(name));
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <UsernameSelector
        isVisible={modalVisible}
        onSelect={handleSelectUsername}
      />
      <Text style={styles.label}>Selected Username: {username}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>
          {isSomeoneConnected ? 'Join to Game' : 'Start Game'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 350,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#095851',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
