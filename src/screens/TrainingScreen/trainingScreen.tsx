import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useActions } from '../../store/hooks';
import { useDispatch } from 'react-redux';

const TrainingScreen = () => {
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]); // Array of strings
  const { setConnectionStatus } = useActions();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.inputContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите имя"
          placeholderTextColor="rgba(229, 229, 229, 0.6)"
          /*
          value={username}
          onChangeText={handleUsernameChange}
*/
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Отправить сообщение</Text>
      </TouchableOpacity>

      <View>
        {receivedMessages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 80,
    marginLeft: 30
  },
  inputContainer: {
    width: 'auto',
    marginBottom: 10
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500'
  },
  input: {
    width: '100%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    backgroundColor: '#095851',
    color: '#fff'
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#095851',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
export default TrainingScreen;
