import {StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TextLink} from '../common/components';

const inputsWidth = Dimensions.get('window').width - 25;

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 1,
      }}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}>
      <Text>LoginScreen</Text>
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="phone" />}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="lock" />}
      />
      <Button
        icon="login"
        mode="contained"
        style={[{backgroundColor: 'green'}, styles.inputs]}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        Login
      </Button>
      <TextLink
        label={'Creat Account'}
        onClick={() => {
          navigation.navigate('Register');
        }}
      />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputs: {
    width: inputsWidth,
    margin: 10,
  },
});
