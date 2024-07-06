import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import io, {Socket} from 'socket.io-client';
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {setPlayer2} from '../../store/gameSlice';
import {useDispatch} from 'react-redux';

// Определяем тип состояния для сокета
type SocketState = Socket<DefaultEventsMap, DefaultEventsMap> | null;

const GameScreen = () => {
  const dispatch = useDispatch();
  const player1 = useSelector((state: RootState) => state.user.player1);
  const player2 = useSelector((state: RootState) => state.user.player2);
  const [socket, setSocket] = useState<SocketState>(null);
  const [playersCount, setPlayersCount] = useState(1);
  const [isGameBeLaunched, setGameStatus] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');

  const [scorePlayer1, setScorePlayer1] = useState(308);
  const [scorePlayer2, setScorePlayer2] = useState(361);
  const [legsPlayer1, setLegsPlayer1] = useState(9);
  const [legsPlayer2, setLegsPlayer2] = useState(10);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const newSocket = io('http://192.168.1.162:3000');

    newSocket.on('connect', () => {
      console.log('Подключен к сокет серверу:', newSocket.id);
      newSocket.emit('send_name', {name: player1});
    });

    newSocket.on('disconnect', () => {
      console.log('Отключен от сокет сервера');
    });

    newSocket.on('usersCount', count => {
      setPlayersCount(count);
      setGameStatus(count === 2);
      if (count === 2) {
        chooseStartingPlayer(newSocket);
      }
    });

    newSocket.on('receive_name', namePlayer2 => {
      console.log('Получено имя второго игрока:', namePlayer2);
      dispatch(setPlayer2(namePlayer2));
    });

    newSocket.on('starting_player', name => {
      Alert.alert(`Оппа, повезло тебе ${name}, начинай`,);
      setCurrentPlayer(name);
    });

    newSocket.on('all_user_names', names => {
      console.log('Получены все имена игроков:', names);
      const otherPlayerId = Object.keys(names).find(id => id !== newSocket.id);
      if (otherPlayerId) {
        dispatch(setPlayer2(names[otherPlayerId]));
      }
    });

    newSocket.on('max_users', message => {
      console.log('Достигнуто максимальное количество подключенных игроков');
    });

    newSocket.on('starting_player', player => {
      setCurrentPlayer(player);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log('Сокет отключен при размонтировании компонента');
    };
  }, [dispatch, player1]);

  useEffect(() => {
    console.log('------->', { currentPlayer, player1 });
    console.tron.log('Состояние Redux:', {currentPlayer, player2});
    if(player1 === currentPlayer) {
      setGameStatus(true);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (playersCount === 1) {
      dispatch(setPlayer2(undefined));
      setGameStatus(false);
    }
  }, [dispatch, playersCount]);

  const chooseStartingPlayer = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  ) => {
    const startingPlayer = Math.random() < 0.5 ? player1 : player2;
    socket.emit('starting_player', startingPlayer);
  };

  const handleSend = () => {
    // const value = parseInt(inputValue, 10);
    // if (isNaN(value)) {
    //   return;
    // }
    //
    // let newScorePlayer1 = scorePlayer1;
    // let newScorePlayer2 = scorePlayer2;
    // let newCurrentPlayer = currentPlayer === player1 ? player2 : player1;
    //
    // if (currentPlayer === player1) {
    //   newScorePlayer1 -= value;
    // } else {
    //   newScorePlayer2 -= value;
    // }
    //
    // setScorePlayer1(newScorePlayer1);
    // setScorePlayer2(newScorePlayer2);
    // setCurrentPlayer(newCurrentPlayer || 'player1');
    // setInputValue('');
    //
    // const newState = {
    //   scorePlayer1: newScorePlayer1,
    //   scorePlayer2: newScorePlayer2,
    //   legsPlayer1,
    //   legsPlayer2,
    //   currentPlayer: newCurrentPlayer,
    // };
    //
    // // Отправка данных через сокет
    // socket?.emit('game_state', newState);
  };

  useEffect(() => {
    console.tron.log('Состояние Redux:', {player1, player2});
  }, [player1, player2]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>PREMIER LEAGUE FINAL</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.headerCell}>FIRST TO 11</Text>
            <Text style={styles.headerCell}>LEGS</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                styles.playerName,
                currentPlayer === player1 && styles.activePlayer,
              ]}>
              {!!player1 && player1}
            </Text>
            <Text style={[styles.cell, styles.score]}>{legsPlayer1}</Text>
            <Text style={[styles.cell, styles.score]}>{scorePlayer1}</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                styles.playerName,
                currentPlayer === player2 && styles.activePlayer,
              ]}>
              {!!player2 && player2}
            </Text>
            <Text style={[styles.cell, styles.score]}>{legsPlayer2}</Text>
            <Text style={[styles.cell, styles.score]}>{scorePlayer2}</Text>
          </View>
        </View>
        <TextInput
          style={[styles.input, isGameBeLaunched && styles.inputActive]}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="Введите очки"
          placeholderTextColor="#8E8D8D"
          editable={isGameBeLaunched}
        />
        <Button
          title="Send"
          onPress={handleSend}
          disabled={!isGameBeLaunched}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333',
  },
  headerRow: {
    backgroundColor: '#111',
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  playerName: {
    textAlign: 'left',
  },
  score: {
    backgroundColor: '#b22222',
    color: '#fff',
  },
  activePlayer: {
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#fff',
    backgroundColor: '#333',
  },
  inputActive: {
    color: 'black',
    backgroundColor: '#ccc',
  },
});

export default GameScreen;
