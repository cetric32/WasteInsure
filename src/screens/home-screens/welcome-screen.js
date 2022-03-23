import * as React from 'react';
import {Text, View, Dimensions, Alert, StyleSheet} from 'react-native';
import {Card, Avatar, Title, Paragraph, Button} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const inputsWidth = Dimensions.get('window').width - 25;

const LeftContent = props => <Avatar.Icon {...props} icon="recycle" />;

function WelcomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="You have Plastic Waste?"
          // subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Paragraph>
            Give us Plastic waste, we give you points which you can redeem for
            insurance or money. Withdraw money easily to your mobile money or
            bank account and use it to cover your bills.
          </Paragraph>
          <Paragraph>
            Click on Agents below to see the nearest collection centers or click
            on Redeem to receive your earnings.
          </Paragraph>
        </Card.Content>
        {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
        <Card.Actions>
          <Button
            icon={'map-marker'}
            onPress={() => {
              navigation.navigate('Agents');
            }}>
            Agents
          </Button>
          <Button
            icon={'gift'}
            onPress={() => {
              navigation.navigate('Redeem');
            }}>
            Redeem
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card} mode="elevated">
        <Card.Title
          title="Summary"
          // subtitle="Card Subtitle"
          //left={LeftContent}
        />
        <Card.Content>
          <Paragraph>
            You have 10 points. This will give you 100/= when redeemed.
          </Paragraph>
          <Paragraph>
            Note that 1 point will give you 10/= when redeemed. The minimum
            amount you can redeem is 200/=
          </Paragraph>
        </Card.Content>
        {/* <Card.Cover source={{uri: 'https://picsum.photos/700'}} /> */}
        {/* <Card.Actions>
          <Button
            icon={'map-marker'}
            onPress={() => {
              Alert.alert('Coming soon!', 'Feature coming soon!');
            }}>
            Agents
          </Button>
          <Button
            icon={'gift'}
            onPress={() => {
              navigation.navigate('Redeem');
            }}>
            Redeem
          </Button>
        </Card.Actions> */}
      </Card>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  card: {
    width: inputsWidth,
    marginBottom: 7,
  },
});
