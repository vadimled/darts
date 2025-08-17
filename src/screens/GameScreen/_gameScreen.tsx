import React, { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GameState, setGameState, setPlayer2 } from '../../store/gameSlice';

type SocketState = Socket<DefaultEventsMap, DefaultEventsMap> | null;

const GameScreen = () => {
  const dispatch = useDispatch();
  const player1 = useSelector((state: RootState) => state.user.player1);
  const player2 = useSelector((state: RootState) => state.user.player2);
  const { scorePlayer1, scorePlayer2, legsPlayer1, legsPlayer2 } = useSelector(
    (state: RootState) => state.user.gameState
  );

  const [socket, setSocket] = useState<SocketState>(null);
  const [playersCount, setPlayersCount] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [currentStatus, setCurrentStatus] = useState<GameState>({} as GameState);

  useEffect(() => {
    const newSocket = io('http://192.168.1.162:3000');

    newSocket.on('connect', () => {
      console.log('Подключен к сокет серверу:', newSocket.id);
      newSocket.emit('send_name', { name: player1 });
    });

    newSocket.on('disconnect', () => {
      console.log('Отключен от сокет сервера');
    });

    newSocket.on('usersCount', count => {
      setPlayersCount(count);
    });

    newSocket.on('receive_name', namePlayer2 => {
      console.log('Получено имя второго игрока:', namePlayer2);
      dispatch(setPlayer2(namePlayer2));
    });

    newSocket.on('starting_player', name => {
      Alert.alert(`Оппа, повезло тебе ${name}, начинай`);
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

    newSocket.on('game_state_to_second_player', (newState: GameState) => {
      console.log(
        `game_state_to_second_player: ${JSON.stringify(
          newState,
          null,
          2
        )};  player1: ${player1};  `
      );

      dispatch(setGameState(newState));
      setCurrentPlayer(newState.currentPlayer || '');
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log('Сокет отключен при размонтировании компонента');
    };
  }, [dispatch, player1]);

  useEffect(() => {
    if (playersCount === 1) {
      dispatch(setPlayer2(undefined));
      setCurrentPlayer('');
    }
  }, [dispatch, playersCount]);

  //TODO
  const analyzeRemainingPoints = () => {
    const maxStartedNumber = 182;
    const minDoubleNumber = 2;
    if (scorePlayer1 > maxStartedNumber) return;


  };

  const handleBust = () => {
    let newCurrentPlayer = currentPlayer === player1 ? player2 : player1;
    setCurrentPlayer(newCurrentPlayer || 'player1');
    dispatch(setGameState(currentStatus));
    socket?.emit('game_state', currentStatus);
  };

  const handleSend = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      return;
    }

    let newScorePlayer1 = scorePlayer1;
    let newScorePlayer2 = scorePlayer2;
    let newCurrentPlayer = currentPlayer === player1 ? player2 : player1;

    if (currentPlayer === player1) {
      newScorePlayer1 -= value;
    } else {
      newScorePlayer2 -= value;
    }

    setCurrentPlayer(newCurrentPlayer || 'player1');
    setInputValue('');

    const newState: GameState = {
      scorePlayer1: newScorePlayer1,
      scorePlayer2: newScorePlayer2,
      legsPlayer1,
      legsPlayer2,
      currentPlayer: newCurrentPlayer
    };
    setCurrentStatus(newState);
    dispatch(setGameState(newState));
    socket?.emit('game_state', newState);
  };

  const isInputActive = playersCount === 2 && currentPlayer === player1;

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
                currentPlayer === player1 && styles.activePlayer
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
                currentPlayer === player2 && styles.activePlayer
              ]}>
              {!!player2 && player2}
            </Text>
            <Text style={[styles.cell, styles.score]}>{legsPlayer2}</Text>
            <Text style={[styles.cell, styles.score]}>{scorePlayer2}</Text>
          </View>
        </View>
        <TextInput
          style={[styles.input, isInputActive && styles.inputActive]}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="Введите очки"
          placeholderTextColor="#8E8D8D"
          editable={isInputActive}
        />
        <Button title="Send" onPress={handleSend} disabled={!isInputActive} />
        <Button title="Bust" onPress={handleBust} disabled={!isInputActive} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16
  },
  table: {
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#333'
  },
  headerRow: {
    backgroundColor: '#111'
  },
  cell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff'
  },
  headerCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  playerName: {
    textAlign: 'left'
  },
  score: {
    backgroundColor: '#b22222',
    color: '#fff'
  },
  activePlayer: {
    color: 'red'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#fff',
    backgroundColor: '#333'
  },
  inputActive: {
    color: 'black',
    backgroundColor: '#ccc'
  }
});

export default GameScreen;
