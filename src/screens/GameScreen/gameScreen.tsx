import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GameState, setGameState, setPlayer2 } from '../../store/gameSlice';
import { PlayerScoreCardGroup } from '@screens/GameScreen/playerScoreCardGroup';
import { SubmitButton } from '@screens/GameScreen/submitButton';
import LegsCard from '@screens/GameScreen/legsCard';
import RoundResultModal from '@screens/GameScreen/roundResultModal';

type SocketState = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export const GameScreen: FC = () => {
  const dispatch = useDispatch();
  const player1 = useSelector((state: RootState) => state.user.player1);
  const player2 = useSelector((state: RootState) => state.user.player2);
  const { scorePlayer1, scorePlayer2, legsPlayer1, legsPlayer2 } = useSelector(
    (state: RootState) => state.user.gameState
  );
  const [error, setError] = useState('');
  const [socket, setSocket] = useState<SocketState>(null);
  const [playersCount, setPlayersCount] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [currentStatus, setCurrentStatus] = useState<GameState>({} as GameState);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [winnerName, setWinnerName] = useState<string>('');

  useEffect(() => {
    const newSocket = io('http://localhost:3000');

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
    if (isNaN(value) || value < 0 || value > 180) {
      setError('Must be between 0 and 180');
      return;
    }
    setError('');
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
      scorePlayer1: newScorePlayer1 < 0 ? 0 : newScorePlayer1,
      scorePlayer2: newScorePlayer2 < 0 ? 0 : newScorePlayer2,
      legsPlayer1,
      legsPlayer2,
      currentPlayer: newCurrentPlayer
    };
    setCurrentStatus(newState);
    dispatch(setGameState(newState));
    socket?.emit('game_state', newState);
  };

  // запоминаем стартовые значения счёта, чтобы корректно сбрасывать
  const initialScoresRef = useRef<{ p1: number; p2: number } | null>(null);
  useEffect(() => {
    if (!initialScoresRef.current) {
      initialScoresRef.current = { p1: scorePlayer1, p2: scorePlayer2 };
    }
  }, [scorePlayer1, scorePlayer2]);

  // следим за концом раунда
  useEffect(() => {
    if (scorePlayer1 === 0 || scorePlayer2 === 0) {
      const winner = scorePlayer1 === 0 ? (player1 || 'Player 1') : (player2 || 'Player 2');
      setWinnerName(winner);
      setIsResultVisible(true);
    }
  }, [scorePlayer1, scorePlayer2, player1, player2]);

  const handleContinueRound = () => {
    const init = initialScoresRef.current ?? { p1: 301, p2: 301 }; // fallback если вдруг не успели зафиксировать
    const p1Won = scorePlayer1 === 0;
    const p2Won = scorePlayer2 === 0;

    const nextState: GameState = {
      scorePlayer1: init.p1,
      scorePlayer2: init.p2,
      // победителю +1 лег
      legsPlayer1: legsPlayer1 + (p1Won ? 1 : 0),
      legsPlayer2: legsPlayer2 + (p2Won ? 1 : 0),
      // пусть следующий лег начинает победитель
      currentPlayer: p1Won ? player1 : player2,
    };

    setIsResultVisible(false);
    setInputValue('');
    setError('');
    setCurrentPlayer(nextState.currentPlayer || '');
    setCurrentStatus(nextState);

    dispatch(setGameState(nextState));
    socket?.emit('game_state', nextState);
  };

  const isInputActive = playersCount === 2 && currentPlayer === player1;
  const isPlayerInputActive = isInputActive;
  const hasActiveGame = scorePlayer1 > 0 && scorePlayer2 > 0;
  const isBustButtonEnabled = !isPlayerInputActive && !hasActiveGame;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Game</Text>
        </View>

        <View style={styles.scoreBlock}>
          <PlayerScoreCardGroup
            scorePlayer1={scorePlayer1}
            scorePlayer2={scorePlayer2}
            legsPlayer1={!!player1 && player1}
            legsPlayer2={!!player2 && player2}
          />
        </View>

        <LegsCard />


        <View style={styles.actionContainer}>
          <Text style={styles.inputLabel}>Enter Throws</Text>
          <View style={styles.actionWrapper}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, isInputActive && styles.inputActive]}
                value={inputValue}
                onChangeText={setInputValue}
                keyboardType="numeric"
                placeholder={isInputActive ? 'Enter points' : ''}
                placeholderTextColor="#8E8D8D"
                editable={isInputActive}
              />
              <Text style={[styles.errorText, !error && styles.errorHidden]}>
                {error || ' '}
              </Text>
            </View>
            <SubmitButton
              onPress={handleSend}
              disabled={!isInputActive}
            />
          </View>
        </View>
        <RoundResultModal
          visible={isResultVisible}
          winner={winnerName}
          onContinue={handleContinueRound}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFCEB',
    textAlign: 'center'
  },
  headerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'center',
    marginBottom: 24
  },
  headerText: {
    color: '#FFFCEB',
    fontSize: 32,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  scoreBlock: {
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  playerRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#033e32'
  },
  playerRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  playerName: {
    color: '#A6C4B3',
    fontSize: 20
  },
  playerScore: {
    color: '#FFFCEB',
    fontSize: 28,
    fontWeight: 'bold'
  },
  actionContainer: {
    width: '100%',
    marginTop: 24,
    paddingHorizontal: 16,
    justifyContent: 'flex-start'
  },
  inputLabel: {
    color: '#FFFCEB',
    fontSize: 16,
    marginBottom: 6
  },
  actionWrapper: {
    flexDirection: 'row',
    width: '100%',
    gap: 8                    // RN 0.74+; если нельзя — см. marginRight на кнопке
  },
  inputWrapper: {
    flex: 3,                    // всё оставшееся место — под инпут
    flexDirection: 'column',
    paddingBottom: 0
  },
  input: {
    height: 42,
    backgroundColor: '#706f6f',
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    color: '#333'
  },
  errorText: {
    color: '#f77676',
    fontSize: 14,
    lineHeight: 18,
    minHeight: 18,
    marginTop: 4,
    marginBottom: 0
  },
  errorHidden: {
    opacity: 0
  },
  inputActive: {
    color: 'black',
    backgroundColor: '#F6F1DD'
  },
  button: {
    backgroundColor: '#D96B5A'
  },
  disabled: {
    backgroundColor: '#73433B'
  }
});

export default GameScreen;
