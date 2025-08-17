import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PlayerScoreCard } from './playerScoreCard';

type PlayerScoreCardGroupProps = {
  scorePlayer1: number;
  scorePlayer2: number;
  legsPlayer1: string;
  legsPlayer2: string;
};

export const PlayerScoreCardGroup: React.FC<PlayerScoreCardGroupProps> = ({
  scorePlayer1,
  scorePlayer2,
  legsPlayer1,
  legsPlayer2
}) => {
  return (
    <View style={styles.group}>
      <PlayerScoreCard name={legsPlayer1} score={scorePlayer1} />
      <PlayerScoreCard name={legsPlayer2} score={scorePlayer2} />
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    gap: 6
  }
});
