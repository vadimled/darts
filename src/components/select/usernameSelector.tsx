import React, { FC, useMemo, useState } from 'react';
import { Button, Modal, Platform, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

interface UsernameSelectorProps {
  isVisible: boolean;
  onSelect: (username: string) => void;
}

const items: Array<{ label: string; value: string }> = [
  { label: 'Vadim', value: 'Vadim' },
  { label: 'Ilya', value: 'Ilya' }
];

const UsernameSelector: FC<UsernameSelectorProps> = ({ isVisible, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const pickerSelectProps: PickerSelectProps = useMemo(
    () => ({
      value: selectedValue,
      onValueChange: (value) => setSelectedValue(value),
      items,
      // Android-специфика (на iOS не влияет, но не мешает):
      useNativeAndroidPickerStyle: false,
      // Расширим кликабельную область и дадим явные пропсы врапперу:
      touchableWrapperProps: {
        hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
        testID: 'username-picker-trigger'
      },
      style: {
        viewContainer: styles.viewContainer, // ширина 100%
        inputIOS: styles.inputIOS,
        inputAndroid: styles.inputAndroid,
        placeholder: styles.placeholder,
        iconContainer: { right: 10, top: 16 }
      },
      placeholder: {
        label: 'Select a username…',
        value: null,
        color: 'gray'
      },
      doneText: 'Done',
      openPickerOnMount: true
    }),
    [selectedValue]
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={() => onSelect(selectedValue || '')}
      presentationStyle={Platform.OS === 'ios' ? 'overFullScreen' : undefined}
    >
      <View style={styles.centeredView} pointerEvents="box-none">
        <View style={styles.modalView}>
          <Text style={styles.title}>Select a username:</Text>

          {/* Кастомный триггер — РЕКОМЕНДУЕМЫЙ способ */}
          <RNPickerSelect {...pickerSelectProps}>
            <View style={styles.fakeInput}>
              <Text style={styles.fakeInputText}>
                {selectedValue ?? 'Select a username…'}
              </Text>
            </View>
          </RNPickerSelect>

          {selectedValue ? (
            <Text style={styles.selectedValue}>Selected: {selectedValue}</Text>
          ) : null}

          <View style={styles.actions}>
            <Button title="Send" onPress={() => onSelect(selectedValue || '')} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 150
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    gap: 12
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  viewContainer: {
    width: '100%'
  },
  // эти стили библиотека использует, когда РЕНДЕРИТ input сама
  inputIOS: {
    display: 'none' // скрываем дефолтный input, т.к. используем children
  },
  inputAndroid: {
    display: 'none'
  },
  // наш видимый «инпут»-триггер
  fakeInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  fakeInputText: {
    color: 'black',
    fontSize: 16
  },
  placeholder: {
    color: 'gray',
    fontSize: 14
  },
  selectedValue: {
    marginTop: 4,
    fontSize: 16,
    color: 'blue'
  },
  actions: {
    marginTop: 8,
    alignSelf: 'flex-end'
  }
});

export default UsernameSelector;
