import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type SubmitButtonProps = {
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  label = 'SEND',
  style,
  textStyle,
  disabled = true
}) => {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabled, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.text, disabled && styles.disabled, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 80,
    height: 42,
    backgroundColor: '#329566',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#1F5135',
    color: '#706f6f'
  },
  text: {
    color: '#FFFCEB',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  }
});
