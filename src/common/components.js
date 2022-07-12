import {Text} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import React, {useRef} from 'react';
import _ from 'lodash';
import {DEFAULT_COUNTRY} from './constants';

export const TextLink = ({onClick = () => {}, label, styles}) => {
  return (
    <Text style={{color: 'blue'}} onPress={onClick}>
      {label}
    </Text>
  );
};

export const PhoneNumberInput = ({
  phone,
  setPhone,
  phoneIsValid,
  formattedValue,
  country,
  setCountry,
  width,
  setPhoneIsValid = () => {},
  setFormattedValue = () => {},
}) => {
  const phoneInput = useRef(PhoneInput);

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        //defaultValue={phone}
        value={String(phone)}
        defaultCode={_.get(country, 'cca2', DEFAULT_COUNTRY.countryCode)}
        layout="first"
        onChangeCountry={country => {
          if (setCountry) {
            setCountry(country);
          }
        }}
        onChangeText={text => {
          setPhone(text);
          const checkValid = phoneInput.current?.isValidNumber(text);
          setPhoneIsValid(checkValid ? checkValid : false);
          // console.log('phoneIsValid', checkValid, text);
          // console.log('getCountryCode', phoneInput.current?.getCountryCode());
          // console.log('getCallingCode', phoneInput.current?.getCallingCode());
          // console.log(
          //   'getNumberAfterPossiblyEliminatingZero',
          //   phoneInput.current?.getNumberAfterPossiblyEliminatingZero(),
          // );
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus
        containerStyle={{
          width: width || '95%',
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 4,
          padding: 0,
        }}
      />
    </>
  );
};
