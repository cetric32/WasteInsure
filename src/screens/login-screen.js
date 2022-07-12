import {StyleSheet, ScrollView, Dimensions, Alert, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  TextInput,
  Text,
  Paragraph,
  Title,
  Headline,
  ActivityIndicator,
} from 'react-native-paper';
import {PhoneNumberInput, TextLink} from '../common/components';
import {connect} from 'react-redux';
import {loginUser, getCountries} from './../store/actions';
import {useEffect} from 'react';
import {getDataStorage} from '../common/functions';

const inputsWidth = Dimensions.get('window').width - 25;

const LoginScreen = props => {
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState('');
  const [phoneIsValid, setPhoneIsValid] = useState(false);
  const [country, setCountry] = useState('');

  useEffect(() => {
    getDataStorage('country')
      .then(data => {
        if (data) {
          console.log('country', data);
          setCountry(data);
        } else {
          setCountry({});
        }
      })
      .catch(() => {});

    getDataStorage('lastPhone')
      .then(data => {
        if (data) {
          setPhone(data);
        } else {
          setPhone('');
        }
      })
      .catch(() => {});
  }, []);

  useEffect(props.getCountries, []);

  const login = () => {
    props.loginUser(
      {
        phone: `${phone}`,
        password,
        country,
        phoneCode: `+${country.callingCode[0]}`,
      },
      () => {
        setPassword('');
        props.navigation.navigate('Home');
      },
    );
  };

  if (typeof country === 'object' && typeof phone === 'string') {
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
        <PhoneNumberInput
          phone={phone}
          setPhone={setPhone}
          phoneIsValid={phoneIsValid}
          setPhoneIsValid={setPhoneIsValid}
          country={country}
          setCountry={setCountry}
          width={inputsWidth}
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
  } else {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
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
