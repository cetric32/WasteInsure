import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  TextInput,
  Text,
  Paragraph,
  Title,
  Headline,
} from 'react-native-paper';
import {TextLink} from '../common/components';
import {connect} from 'react-redux';
import {loginUser, getCountries} from './../store/actions';
import {useEffect} from 'react';
import {getDataStorage} from '../common/functions';

const inputsWidth = Dimensions.get('window').width - 25;

const LoginScreen = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(props.getCountries, []);

  useEffect(() => {
    getDataStorage('lastPhone')
      .then(data => {
        if (data) {
          setPhone(data);
        }
      })
      .catch(() => {});
  }, []);

  const login = () => {
    props.loginUser({phone, password}, () => {
      setPassword('');
      props.navigation.navigate('Home');
    });
  };

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
      <Title>Welcome to WasteInsure</Title>
      <Paragraph style={styles.paragraph}>
        Use Plastic to pay all your health and education insurances, and also
        your bills.
      </Paragraph>
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="phone" />}
        keyboardType="phone-pad"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="lock" />}
        secureTextEntry={true}
      />
      <Button
        icon="login"
        mode="contained"
        loading={props.isSigningIn}
        disabled={props.isSigningIn}
        style={[{backgroundColor: '#2AB34A'}, styles.inputs]}
        onPress={login}>
        Login
      </Button>
      <TextLink
        label={'Create Account'}
        onClick={() => {
          props.navigation.navigate('Register');
        }}
      />
    </ScrollView>
  );
};

const mapStateToProps = ({user}) => {
  return {
    isSigningIn: user.isSigningIn,
  };
};

export default connect(mapStateToProps, {loginUser, getCountries})(LoginScreen);

const styles = StyleSheet.create({
  inputs: {
    width: inputsWidth,
    margin: 10,
  },
  paragraph: {
    marginHorizontal: 10,
    margin: 10,
    width: inputsWidth,
  },
});
