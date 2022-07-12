import * as React from 'react';
import {Dimensions, Linking, StyleSheet, Text, View} from 'react-native';
import {Button, Card, Title} from 'react-native-paper';

const inputsWidth = Dimensions.get('window').width - 35;

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
            alignContent: 'center',
          }}>
          <Title>
            Please update the app in store for better functionalities!
          </Title>
          <Button
            icon="update"
            mode="contained"
            style={[{backgroundColor: '#2AB34A'}, styles.inputs]}
            onPress={() => {
              Linking.openURL(
                `https://play.google.com/store/apps/details?id=com.wasteinsure`,
              );
            }}>
            Update App
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

export default UpdateAppScreen;

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
