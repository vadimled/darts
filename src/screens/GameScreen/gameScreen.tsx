import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import socket from '../../socket';

const GameScreen: React.FC = () => {
  useEffect(() => {
    // Connect and listen to events
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Emit an event when the component mounts
    socket.emit('join_game', {username: 'Player1'});

    socket.on('game_update', data => {
      console.log('Game update received:', data);
    });

    return () => {
      // Cleanup listeners and disconnect on unmount
      socket.off('connect');
      socket.off('game_update');
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to the Game Screen</Text>
    </View>
  );
};

export default GameScreen;
