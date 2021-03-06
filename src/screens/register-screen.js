import {StyleSheet, ScrollView, Dimensions, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput, Text, Badge, Avatar} from 'react-native-paper';
import {PhoneNumberInput, TextLink} from '../common/components';
import {connect} from 'react-redux';
import {registerUser} from '../store/actions';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';
import {DEFAULT_COUNTRY} from '../common/constants';

const inputsWidth = Dimensions.get('window').width - 25;

const RegisterScreen = props => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState({});
  const [phoneIsValid, setPhoneIsValid] = useState(false);

  const register = () => {
    const countryFound = _.find(props.countries, c => {
      const phoneCode = _.isEmpty(country.callingCode)
        ? DEFAULT_COUNTRY.phoneCode
        : `+${country.callingCode[0]}`;

      return c.phone_code === phoneCode;
    });

    console.log('countryFound', countryFound);

    props.registerUser(
      {
        phone: `+${country.callingCode[0]}${phone}`,
        password,
        name,
        email,
        country_id: countryFound.id,
        country,
      },
      () => {
        props.navigation.navigate('Login');
      },
    );
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
      <TextInput
        label="Full Names"
        value={name}
        onChangeText={text => setName(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="account" />}
      />
      {/* <View style={{width: inputsWidth, borderColor: 'grey', borderWidth: 0.9}}>
        <Picker
          selectedValue={country || ''}
          style={styles.inputs}
          onValueChange={(itemValue, itemIndex) => {
            setCountry(itemValue);
            setPhoneCode(itemValue.phone_code);
          }}>
          <Picker.Item label="Select Country" value="" />
          {_.map(props.countries, c => {
            return <Picker.Item label={c.name} value={c} key={c.id} />;
          })}
        </Picker>
      </View> */}

      <PhoneNumberInput
        phone={phone}
        setPhone={setPhone}
        phoneIsValid={phoneIsValid}
        setPhoneIsValid={setPhoneIsValid}
        country={country}
        setCountry={setCountry}
        width={inputsWidth}
      />

      {/* <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="phone" />}
        keyboardType="phone-pad"
        left={<TextInput.Affix text={phoneCode} />}
      /> */}
      <TextInput
        label="Email (optional)"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="email" />}
        keyboardType="email-address"
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
        icon="account-plus"
        mode="contained"
        loading={props.isRegistering}
        disabled={props.isRegistering}
        style={[{backgroundColor: '#2AB34A'}, styles.inputs]}
        onPress={register}>
        Register
      </Button>
      <TextLink
        label={'Login'}
        onClick={() => {
          props.navigation.navigate('Login');
        }}
      />
    </ScrollView>
  );
};

const mapStateToProps = ({user}) => {
  return {
    countries: user.countries,
    isRegistering: user.isRegistering,
  };
};

export default connect(mapStateToProps, {registerUser})(RegisterScreen);

const styles = StyleSheet.create({
  inputs: {
    width: inputsWidth,
    margin: 10,
  },
});
