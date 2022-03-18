import {StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';

const LoginScreen = ({navigation}) => {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
      style={{
        flex: 1,
        flexDirection: 'column',
      }}>
      <Text>LoginScreen</Text>
      <Text
        onPress={() => {
          navigation.navigate('Register');
        }}>
        Go To Register
      </Text>
      <Text
        onPress={() => {
          navigation.navigate('Home');
        }}>
        Go To Main Home Area
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
