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
      // ВАЖНО: disabled-стиль раньше, внешний style — последним
      style={[styles.button, disabled && styles.buttonDisabled, style]}
    >
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minWidth: 80,
    height: 42,
    backgroundColor: '#329566', // дефолт для SEND (enabled)
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#1F5135' // дефолт для SEND (disabled)
  },
  text: {
    color: '#FFFCEB',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1
  },
  textDisabled: {
    color: '#8FA79B' // приглушённый текст для disabled
  }
});
