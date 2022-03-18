import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RegisterScreen = ({navigation}) => {
  return (
    <View>
      <Text>RegisterScreen</Text>
      <Text
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Go To Login Screen
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
