import React, {FC, useState} from 'react';
import {Modal, View, Text, StyleSheet, Button} from 'react-native';
import RNPickerSelect, {PickerSelectProps} from 'react-native-picker-select';

interface UsernameSelectorType {
  isVisible: boolean;
  onSelect: (username: string) => void;
}

const items = [
  {label: 'Vadim', value: 'Vadim'},
  {label: 'Ilya', value: 'Ilya'},
];

const UsernameSelector: FC<UsernameSelectorType> = ({isVisible, onSelect}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const pickerSelectProps: PickerSelectProps = {
    onValueChange: value => setSelectedValue(value),
    items: items,
    style: {
      inputIOS: {
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 4,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 1,
      },
      inputAndroid: {
        color: 'black',
      },
      placeholder: {
        color: 'gray',
        fontSize: 12,
      },
    },
    placeholder: {
      label: 'Select a sport...',
      value: null,
      color: 'gray',
    },
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Select a username:</Text>
          <RNPickerSelect {...pickerSelectProps} />
          {selectedValue && (
            <Text style={styles.selectedValue}>Selected: {selectedValue}</Text>
          )}
        </View>
        <Button title="Send" onPress={() => onSelect(selectedValue || '')} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 150,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 18,
    color: 'blue',
  },
});

export default UsernameSelector;
