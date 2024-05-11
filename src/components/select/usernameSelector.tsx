import React, {FC} from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface UsernameSelectorType {
  isVisible: boolean;
  onSelect: (username: string) => void;
}

const UsernameSelector: FC<UsernameSelectorType> = ({isVisible, onSelect}) => (
  <Modal visible={isVisible} animationType="slide" transparent>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text>Select a username:</Text>
        <RNPickerSelect
          onValueChange={value => onSelect(value)}
          items={[
            {label: 'Vadim', value: 'Vadim'},
            {label: 'Ilya', value: 'Ilya'},
          ]}
          style={pickerSelectStyles}
        />
      </View>
    </View>
  </Modal>
);

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
});

const pickerSelectStyles = StyleSheet.create({
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
});

export default UsernameSelector;
