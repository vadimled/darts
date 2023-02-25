import React, {FC, ReactElement} from 'react';
import {StyleSheet, Text} from 'react-native';

export type LoginViewProps = {
  //
};

const Login: FC<LoginViewProps> = (props): ReactElement => {
  console.log('------------->', props);
  return <Text style={styles.sectionTitle}>Login</Text>;
};
const styles = StyleSheet.create({
  sectionTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 34,
    fontWeight: '600',
    color: 'red',
  },
});

export default Login;
