import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type SubmitButtonProps = {
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
                                                            onPress,
                                                            label = 'SEND',
                                                            style,
                                                            textStyle,
                                                          }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 256, // 512 / 2 for high-DPI scaling
    height: 69, // 138 / 2
    backgroundColor: '#D96A1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  text: {
    color: '#FFFCEB',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 1,
  },
});
