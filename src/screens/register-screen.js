import {StyleSheet, Text, ScrollView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {TextLink} from '../common/components';

const inputsWidth = Dimensions.get('window').width - 25;

const RegisterScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      <Text>RegisterScreen</Text>
      <TextInput
        label="Full Names"
        value={name}
        onChangeText={text => setName(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="account" />}
      />
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="phone" />}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="email" />}
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
        icon="account-plus"
        mode="contained"
        style={[{backgroundColor: 'green'}, styles.inputs]}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Register
      </Button>
      <TextLink
        label={'Login'}
        onClick={() => {
          navigation.navigate('Login');
        }}
      />
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  inputs: {
    width: inputsWidth,
    margin: 10,
  },
});
