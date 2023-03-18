import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export type LoginViewProps = {
  //
};

const Login: FC<LoginViewProps> = (): JSX.Element => {
  return (
    <TouchableOpacity style={styles.center}>
      <Text style={styles.sectionTitle}>Login</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  center: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    width: 200,
    height: 45,
    fontSize: 34,
    fontWeight: '600',
    color: 'red',
    backgroundColor: '#ccc',
  },
});

export default Login;
