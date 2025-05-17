import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { SubmitButton } from './SubmitButton';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Укажи нужный URL сервера

export const DartsGameScreen: React.FC = () => {
  const [score, setScore] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('score:received', (data: string) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('score:received');
    };
  }, []);

  const handleSubmit = () => {
    const numeric = parseInt(score, 10);
    if (isNaN(numeric) || numeric < 0 || numeric > 180) {
      setError('Must be between 0 and 180');
      return;
    }
    setError('');
    socket.emit('score:send', numeric);
    setScore('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Game</Text>

      <View style={styles.scoreBlock}>
        <View style={styles.playerRow}>
          <Text style={styles.playerName}>Player 1</Text>
          <Text style={styles.playerScore}>150</Text>
        </View>
        <View style={styles.playerRow}>
          <Text style={styles.playerName}>Player 2</Text>
          <Text style={styles.playerScore}>135</Text>
        </View>
      </View>

      <View style={styles.legsBlock}>
        <Text style={styles.legsTitle}>LEGS</Text>
        <View style={styles.legsRow}>
          <Text style={styles.legsPlayer}>Player 1</Text>
          <Text style={styles.legsScore}>1-0</Text>
          <Text style={styles.legsScore}>3</Text>
        </View>
        <View style={styles.legsRow}>
          <Text style={styles.legsPlayer}>Player 2</Text>
          <Text style={styles.legsScore}>0-1</Text>
          <Text style={styles.legsScore}>0</Text>
        </View>
      </View>

      <View style={styles.inputBlock}>
        <Text style={styles.inputLabel}>Enter Throws</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={score}
          onChangeText={setScore}
          placeholder="Score"
        />
        {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}
        <SubmitButton onPress={handleSubmit} />
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.legsTitle}>Live Updates:</Text>
        {messages.map((msg, idx) => (
          <Text key={idx} style={{ color: '#A6C4B3' }}>{msg}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#013629',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFCEB',
    textAlign: 'center',
    marginBottom: 24,
  },
  scoreBlock: {
    backgroundColor: '#022d24',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  playerName: {
    color: '#A6C4B3',
    fontSize: 20,
  },
  playerScore: {
    color: '#FFFCEB',
    fontSize: 28,
    fontWeight: 'bold',
  },
  legsBlock: {
    padding: 16,
    backgroundColor: '#012D24',
    borderRadius: 12,
    marginBottom: 16,
  },
  legsTitle: {
    color: '#A6C4B3',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  legsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  legsPlayer: {
    color: '#FFFCEB',
    fontSize: 16,
  },
  legsScore: {
    color: '#FFFCEB',
    fontSize: 16,
  },
  inputBlock: {
    marginTop: 24,
    paddingHorizontal: 8,
  },
  inputLabel: {
    color: '#FFFCEB',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: '#F6F1DD',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
});

export default DartsGameScreen;
