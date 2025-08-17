import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type SubmitButtonProps = {
  onPress: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled, style]} // внешний style — последним
    >
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const BTN_WIDTH = 100; // можно подправить

const styles = StyleSheet.create({
  button: {
    flex:1,
    maxWidth: BTN_WIDTH,
    height: 42,
    flexShrink: 0,                 // не даём кнопке сжиматься
    backgroundColor: '#329566',    // дефолт для SEND
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12
  },
  buttonDisabled: {
    backgroundColor: '#1F5135'
  },
  text: {
    color: '#FFFCEB',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  },
  textDisabled: {
    color: '#8FA79B'
  }
});
