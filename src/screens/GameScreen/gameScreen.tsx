// GameScreen.tsx
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

// Определяем тип состояния для сокета
type SocketState = Socket<DefaultEventsMap, DefaultEventsMap> | null;

const GameScreen = () => {
  const [scoreVanGerwen, setScoreVanGerwen] = useState(308);
  const [scoreWright, setScoreWright] = useState(361);
  const [legsVanGerwen, setLegsVanGerwen] = useState(9);
  const [legsWright, setLegsWright] = useState(10);
  const [currentPlayer, setCurrentPlayer] = useState('van GERWEN');
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<SocketState>(null);

  useEffect(() => {
    const newSocket = io('http://192.168.1.162:3000'); // Замените URL на ваш сервер
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Подключен к сокет серверу:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Отключен от сокет сервера');
    });

    newSocket.on('receive_message', data => {
      console.log(`Получено сообщение: ${data.message}`);
    });

    return () => {
      newSocket.disconnect();
      console.log('Сокет отключен при размонтировании компонента');
    };
  }, []);

  const handleSend = () => {
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      return;
    }

    if (currentPlayer === 'van GERWEN') {
      setScoreVanGerwen(scoreVanGerwen - value);
      setCurrentPlayer('WRIGHT');
    } else {
      setScoreWright(scoreWright - value);
      setCurrentPlayer('van GERWEN');
    }

    setInputValue('');

    // Отправка данных через сокет
    socket?.emit('send_message', {
      message: `Player ${currentPlayer} scored ${value}`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>2017 PREMIER LEAGUE FINAL</Text>
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
                currentPlayer === 'van GERWEN' && styles.activePlayer,
              ]}>
              van GERWEN
            </Text>
            <Text style={[styles.cell, styles.score]}>{legsVanGerwen}</Text>
            <Text style={[styles.cell, styles.score]}>{scoreVanGerwen}</Text>
          </View>
          <View style={styles.row}>
            <Text
              style={[
                styles.cell,
                styles.playerName,
                currentPlayer === 'WRIGHT' && styles.activePlayer,
              ]}>
              WRIGHT
            </Text>
            <Text style={[styles.cell, styles.score]}>{legsWright}</Text>
            <Text style={[styles.cell, styles.score]}>{scoreWright}</Text>
          </View>
        </View>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
          placeholder="Введите очки"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
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
