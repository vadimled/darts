import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Text, View } from "react-native";
import { Button } from "native-base";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import io from 'socket.io-client';
import { AppStackParamList } from "../../darts";

type HomeScreenNavigationProp = NativeStackNavigationProp<AppStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
}
const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const dispatch = useDispatch();
    const username = useSelector((state: RootState) => state.user.username);

    const handleSelectUsername = (name: string) => {
        dispatch(userSlice.actions.setUsername(name));
        setModalVisible(false);
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Selected Username: {username}</Text>
          <Button title="Start Game" onPress={() => navigation.navigate('Game')} />
      </View>
    );
};

export default HomeScreen;
