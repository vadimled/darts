import React, {FC, ReactElement} from 'react';
import {View} from 'react-native';

export type LoginViewProps = {
  //
};

const Login: FC<LoginViewProps> = (props): ReactElement => {
  console.log('------------->', props);
  return <View>Login</View>;
};

export default Login;
