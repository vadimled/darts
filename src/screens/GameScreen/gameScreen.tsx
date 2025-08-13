import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { GameState, setGameState, setPlayer2 } from "../../store/gameSlice";
import { PlayerScoreCardGroup } from "@screens/GameScreen/playerScoreCardGroup";
import { SubmitButton } from "@screens/GameScreen/submitButton";
import LegsBlock from "@screens/GameScreen/legsBlock";

type SocketState = Socket<DefaultEventsMap, DefaultEventsMap> | null;

export const GameScreen: FC = () => {
  const dispatch = useDispatch();
  const player1 = useSelector((state: RootState) => state.user.player1);
  const player2 = useSelector((state: RootState) => state.user.player2);
  const { scorePlayer1, scorePlayer2, legsPlayer1, legsPlayer2 } = useSelector(
    (state: RootState) => state.user.gameState
  );

  const [socket, setSocket] = useState<SocketState>(null);
  const [playersCount, setPlayersCount] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [currentStatus, setCurrentStatus] = useState<GameState>({} as GameState);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Подключен к сокет серверу:", newSocket.id);
      newSocket.emit("send_name", { name: player1 });
    });

    newSocket.on("disconnect", () => {
      console.log("Отключен от сокет сервера");
    });

    newSocket.on("usersCount", count => {
      setPlayersCount(count);
    });

    newSocket.on("receive_name", namePlayer2 => {
      console.log("Получено имя второго игрока:", namePlayer2);
      dispatch(setPlayer2(namePlayer2));
    });

    newSocket.on("starting_player", name => {
      Alert.alert(`Оппа, повезло тебе ${name}, начинай`);
      setCurrentPlayer(name);
    });

    newSocket.on("all_user_names", names => {
      console.log("Получены все имена игроков:", names);
      const otherPlayerId = Object.keys(names).find(id => id !== newSocket.id);
      if (otherPlayerId) {
        dispatch(setPlayer2(names[otherPlayerId]));
      }
    });

    newSocket.on("max_users", message => {
      console.log("Достигнуто максимальное количество подключенных игроков");
    });

    newSocket.on("game_state_to_second_player", (newState: GameState) => {
      console.log(
        `game_state_to_second_player: ${JSON.stringify(
          newState,
          null,
          2
        )};  player1: ${player1};  `
      );

      dispatch(setGameState(newState));
      setCurrentPlayer(newState.currentPlayer || "");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log("Сокет отключен при размонтировании компонента");
    };
  }, [dispatch, player1]);

  useEffect(() => {
    if (playersCount === 1) {
      dispatch(setPlayer2(undefined));
      setCurrentPlayer("");
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
    setCurrentPlayer(newCurrentPlayer || "player1");
    dispatch(setGameState(currentStatus));
    socket?.emit("game_state", currentStatus);
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

    setCurrentPlayer(newCurrentPlayer || "player1");
    setInputValue("");

    const newState: GameState = {
      scorePlayer1: newScorePlayer1,
      scorePlayer2: newScorePlayer2,
      legsPlayer1,
      legsPlayer2,
      currentPlayer: newCurrentPlayer
    };
    setCurrentStatus(newState);
    dispatch(setGameState(newState));
    socket?.emit("game_state", newState);
  };

  const isInputActive = playersCount === 2 && currentPlayer === player1;
  // const [score, setScore] = useState('');
  // const [error, setError] = useState('');
  // const [messages, setMessages] = useState<string[]>([]);
  //
  // useEffect(() => {
  //   socket.on('score:received', (data: string) => {
  //     setMessages(prev => [...prev, data]);
  //   });
  //
  //   return () => {
  //     socket.off('score:received');
  //   };
  // }, []);
  //
  // const handleSubmit = () => {
  //   const numeric = parseInt(score, 10);
  //   if (isNaN(numeric) || numeric < 0 || numeric > 180) {
  //     setError('Must be between 0 and 180');
  //     return;
  //   }
  //   setError('');
  //   socket.emit('score:send', numeric);
  //   setScore('');
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Game</Text>
        </View>

        <View style={styles.scoreBlock}>
          <PlayerScoreCardGroup scorePlayer1={scorePlayer1} scorePlayer2={scorePlayer2}
                                legsPlayer1={!!player1 && player1}
                                legsPlayer2={!!player2 && player2} />
        </View>

        <LegsBlock />

        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>Enter Throws</Text>
          <TextInput
            style={[styles.input, isInputActive && styles.inputActive]}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType="numeric"
            placeholder={isInputActive ? "Enter points" : ""}
            placeholderTextColor="#8E8D8D"
            editable={isInputActive}
          />
          <SubmitButton onPress={handleSend} disabled={!isInputActive} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFCEB",
    textAlign: "center"
  },
  headerContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center",
    marginBottom: 24
  },
  headerText: {
    color: "#FFFCEB",
    fontSize: 32,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  scoreBlock: {
    justifyContent: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  playerRow1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "#033e32"
  },
  playerRow2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  playerName: {
    color: "#A6C4B3",
    fontSize: 20
  },
  playerScore: {
    color: "#FFFCEB",
    fontSize: 28,
    fontWeight: "bold"
  },
  inputBlock: {
    marginTop: 24,
    paddingHorizontal: 8
  },
  inputLabel: {
    color: "#FFFCEB",
    fontSize: 16,
    marginBottom: 6
  },
  input: {
    height: 48,
    backgroundColor: "#706f6f",
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    color: "#333"
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12
  },
  inputActive: {
    color: "black",
    backgroundColor: "#F6F1DD"
  }
});

export default GameScreen;
