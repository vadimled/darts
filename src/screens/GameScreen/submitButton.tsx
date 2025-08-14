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
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 256,
    height: 69,
    backgroundColor: '#D96A1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12
  },
  disabled: {
    backgroundColor: '#392315'
  },
  text: {
    color: '#FFFCEB',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  }
});
