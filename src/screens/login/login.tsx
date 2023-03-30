import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
// import {useDispatch} from 'react-redux';
// import {login} from './authSlice';

interface LoginFormProps {}

const Login: React.FC<LoginFormProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLoginPress = () => {
    // dispatch(login({username, password}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#e5e5e5"
          value={username}
          onChangeText={handleUsernameChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#e5e5e5"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 80,
    marginLeft: 70,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 42,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    backgroundColor: '#095851',
    color: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#095851',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
