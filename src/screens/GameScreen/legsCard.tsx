import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const LegsCard: FC = () => {
  const p1Name = useSelector((s: RootState) => s.user.player1) ?? 'Player 1';
  const p2Name = useSelector((s: RootState) => s.user.player2) ?? 'Player 2';

  // gameState есть, но sets могут ещё не быть в типе → берём аккуратно с fallback
  const gameState: any = useSelector((s: RootState) => s.user.gameState);

  const scoreP1: number = gameState?.scorePlayer1 ?? 0;
  const scoreP2: number = gameState?.scorePlayer2 ?? 0;
  const legsP1: number = gameState?.legsPlayer1 ?? 0;
  const legsP2: number = gameState?.legsPlayer2 ?? 0;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>LEGS / SETS</Text>

      {/* шапка */}
      <View style={[styles.row, styles.headRow]}>
        <Text style={[styles.cell, styles.nameCell, styles.headTxt]}>Player</Text>
        <Text style={[styles.cell, styles.center, styles.headTxt]}>Legs</Text>
        <Text style={[styles.cell, styles.right, styles.headTxt]}>Rem</Text>
      </View>

      {/* Player 1 */}
      <View style={styles.row}>
        <Text numberOfLines={1} style={[styles.cell, styles.nameCell]}>{p1Name}</Text>
        <Text style={[styles.cell, styles.center, styles.num]}>{legsP1}</Text>
        <Text style={[styles.cell, styles.right, styles.num]}>{scoreP1}</Text>
      </View>

      {/* Player 2 */}
      <View style={styles.row}>
        <Text numberOfLines={1} style={[styles.cell, styles.nameCell]}>{p2Name}</Text>
        <Text style={[styles.cell, styles.center, styles.num]}>{legsP2}</Text>
        <Text style={[styles.cell, styles.right, styles.num]}>{scoreP2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '70%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,252,235,0.10)'
  },
  title: {
    color: '#A6C4B3',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,252,235,0.06)'
  },
  headRow: {
    paddingVertical: 4,
    borderBottomColor: 'rgba(255,252,235,0.14)'
  },
  cell: {
    color: '#FFFCEB',
    fontSize: 16,
    flexShrink: 0
  },
  nameCell: {
    flex: 1.6,          // имя шире
    paddingRight: 8
  },
  center: { textAlign: 'center', flex: 0.55 },
  right: { textAlign: 'right', flex: 0.8 },
  headTxt: {
    color: '#A6C4B3',
    fontSize: 14,
    letterSpacing: 0.5
  },
  num: {
    fontVariant: ['tabular-nums'] // ровная колонка цифр (iOS)
  }
});

export default LegsCard;
