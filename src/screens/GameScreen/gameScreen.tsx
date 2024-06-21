import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
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
  const [playersCount, setPlayersCount] = useState(0);
  // const [currentPlayer, setCurrentPlayer] = useState<string>('');

  const [scorePlayer1, setScorePlayer1] = useState(308);
  const [scorePlayer2, setScorePlayer2] = useState(361);
  const [legsPlayer1, setLegsPlayer1] = useState(9);
  const [legsPlayer2, setLegsPlayer2] = useState(10);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const newSocket = io('http://192.168.1.162:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Подключен к сокет серверу:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Отключен от сокет сервера');
    });

    newSocket?.emit('send_name', {
      name: player1,
    });

    return () => {
      newSocket.disconnect();
      console.log('Сокет отключен при размонтировании компонента');
    };
  }, []);

  useEffect(() => {
    socket?.on('usersCount', count => {
      console.log('Players count: ', count);
      setPlayersCount(count);
    });
  }, [socket, playersCount]);

  useEffect(() => {
    // Обработка события сокета
    socket?.on('receive_name', namePlayer2 => {
      console.log('Player 2: ', namePlayer2);
      dispatch(setPlayer2(namePlayer2));
    });

    socket?.emit('send_name', {
      name: player1,
    });
  }, [dispatch, player2, socket]);

  // socket?.on('game_state', state => {
  //   setScorePlayer1(state.scorePlayer1);
  //   setScorePlayer2(state.scorePlayer2);
  //   setLegsPlayer1(state.legsPlayer1);
  //   setLegsPlayer2(state.legsPlayer2);
  //   setCurrentPlayer(state.currentPlayer);
  // });

  //
  // useEffect(() => {
  //   socket?.on('receive_name', name => {
  //     console.log('Player name: ', name);
  //     setPlayersCount(count);
  //   });
  // }, [socket]);
  //

  const canTheGameBeLaunched = (): boolean => {
    return playersCount === 2;
  };

  const handleSend = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      return;
    }

    let newScorePlayer1 = scorePlayer1;
    let newScorePlayer2 = scorePlayer2;
    let newCurrentPlayer = player2;

    if (currentPlayer === player1) {
      newScorePlayer1 -= value;
      newCurrentPlayer = 'Vadim';
    } else {
      newScorePlayer2 -= value;
      newCurrentPlayer = 'Ilya';
    }

    setScorePlayer1(newScorePlayer1);
    setScorePlayer2(newScorePlayer2);
    setCurrentPlayer(newCurrentPlayer);
    setInputValue('');

    const newState = {
      scorePlayer1: newScorePlayer1,
      scorePlayer2: newScorePlayer2,
      legsPlayer1,
      legsPlayer2,
      currentPlayer: newCurrentPlayer,
    };

    // Отправка данных через сокет
    socket?.emit('game_state', newState);
  };

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
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="Введите очки"
          editable={canTheGameBeLaunched()}
        />
        <Button
          title="Send"
          onPress={handleSend}
          disabled={!canTheGameBeLaunched()}
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
});

export default GameScreen;
