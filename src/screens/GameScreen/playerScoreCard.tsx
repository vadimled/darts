import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type PlayerScoreCardProps = {
  name: string;
  score: number;
  style?: ViewStyle;
};

export const PlayerScoreCard: React.FC<PlayerScoreCardProps> = ({ name, score, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0d3c3a',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // для Android

  },
  name: {
    fontSize: 24,
    color: '#FFFCEB',
    marginBottom: 12,
  },
  score: {
    textAlign: 'center',
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFCEB',
    backgroundColor: '#012D24',
    width: '100%'
  },
});
