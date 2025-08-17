// @screens/GameScreen/roundResultModal.tsx
import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  visible: boolean;
  winner: string;
  onContinue: () => void;
};

export const RoundResultModal: React.FC<Props> = ({ visible, winner, onContinue }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Round finished</Text>
          <Text style={styles.subtitle}>Winner: {winner}</Text>
          <Pressable style={styles.btn} onPress={onContinue}>
            <Text style={styles.btnText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '84%',
    backgroundColor: '#113832',     // гармонирует с фоном экрана
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,252,235,0.12)',
  },
  title: {
    color: '#FFFCEB',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: '#A6C4B3',
    fontSize: 18,
    marginBottom: 16,
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#3BAE78',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnText: {
    color: '#FFFCEB',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

export default RoundResultModal;
