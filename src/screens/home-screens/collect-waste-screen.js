import {StyleSheet, ScrollView, Dimensions, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput, Paragraph} from 'react-native-paper';
import {connect} from 'react-redux';
import {collectUserWaste} from '../../store/actions';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

const inputsWidth = Dimensions.get('window').width - 25;

const CollectWasteScreen = props => {
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState({});
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    setCountry(_.find(props.countries, c => c.id == props.countryId));
  }, []);

  const collectWaste = () => {
    props.collectUserWaste(
      {
        phone: `${country.phone_code || ''}${phone}`,
        type: type.id,
        quantity,
      },
      () => {
        setPhone('');
        setQuantity('');
        setType('');
        Alert.alert('Success', 'Waste collection successful');
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
      <Paragraph style={styles.inputs}>
        Please Enter the details of the customer below. If they already have
        WasteInsure app, they should give you the phone number they registered
        with.
      </Paragraph>
      <Paragraph style={styles.inputs}>
        Note that you can only collect from a person with a mobile number in
        {` ${country.name}`}. If they have a number for a different country
        contact support for help.
      </Paragraph>
      <TextInput
        label="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
        mode="outlined"
        style={styles.inputs}
        right={<TextInput.Icon name="phone" />}
        keyboardType="phone-pad"
        left={<TextInput.Affix text={country.phone_code} />}
      />
      <View style={{width: inputsWidth, borderColor: 'grey', borderWidth: 0.9}}>
        <Picker
          selectedValue={type || ''}
          style={styles.inputs}
          onValueChange={(itemValue, itemIndex) => {
            setType(itemValue);
          }}>
          <Picker.Item label="Select Plastic Type" value="" />
          {_.map(props.plasticTypes, c => {
            return <Picker.Item label={c.name} value={c} key={c.id} />;
          })}
        </Picker>
      </View>
      {type ? (
        <Paragraph
          style={{
            width: inputsWidth - 10,
            color: 'gray',
            fontStyle: 'italic',
          }}>
          {type.examples}
        </Paragraph>
      ) : null}

      <TextInput
        label="Quantity( In KGs)"
        value={quantity}
        onChangeText={text => setQuantity(text)}
        mode="outlined"
        style={styles.inputs}
        //right={<TextInput.Icon name="email" />}
        keyboardType="numeric"
      />
      <Button
        icon="plus"
        mode="contained"
        loading={props.collectingWaste}
        disabled={props.collectingWaste}
        style={[{backgroundColor: 'green'}, styles.inputs]}
        onPress={collectWaste}>
        Save
      </Button>
    </ScrollView>
  );
};

const mapStateToProps = ({user}) => {
  return {
    countries: user.countries,
    countryId: user.userDetails.user.country_id,
    collectingWaste: user.collectingWaste,
    plasticTypes: user.plasticTypes,
  };
};

export default connect(mapStateToProps, {collectUserWaste})(CollectWasteScreen);

const styles = StyleSheet.create({
  inputs: {
    width: inputsWidth,
    margin: 10,
  },
});
