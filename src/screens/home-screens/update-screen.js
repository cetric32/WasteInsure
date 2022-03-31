import * as React from 'react';
import {Text, View} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Card, Title} from 'react-native-paper';

function UpdateAppScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Card
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 2,
        }}>
        <Card.Content
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <Title>
            Please update the app in store for better functionalities!
          </Title>
        </Card.Content>
      </Card>
    </View>
  );
}

export default UpdateAppScreen;
