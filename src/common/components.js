import {Text} from 'react-native-paper';
import React from 'react';
export const TextLink = ({onClick = () => {}, label}) => {
  return (
    <Text style={{color: 'blue'}} onPress={onClick}>
      {label}
    </Text>
  );
};
