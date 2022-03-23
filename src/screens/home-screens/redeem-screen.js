import * as React from 'react';
import {Text, View, Dimensions, StyleSheet, Alert} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Paragraph,
  Avatar,
  Card,
  Title,
  Button,
  Banner,
  Portal,
  Modal,
  Provider,
  TextInput,
} from 'react-native-paper';
import {useState} from 'react';

const inputsWidth = Dimensions.get('window').width - 25;

function WithdrawModal({visible, hideModal}) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Title> Withdraw Mobile Money</Title>
        <Paragraph>
          Your 10 points have a value of 200/=. Note that withdrawal fees are
          charged on the points.
        </Paragraph>
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={text => setPhone(text)}
          mode="outlined"
          style={styles.inputs}
          right={<TextInput.Icon name="phone" />}
        />
        <TextInput
          label="Amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={text => setAmount(text)}
          mode="outlined"
          style={styles.inputs}
        />
        <Button
          icon={require('../../images/money.png')}
          mode="contained"
          style={[{backgroundColor: 'green'}, styles.inputs]}
          onPress={() => {}}>
          Withdraw
        </Button>
      </Modal>
    </Portal>
  );
}

function RedeemScreen(props) {
  const [bannerVisible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
      }}>
      <Provider>
        <Card style={styles.card} mode="elevated">
          <Card.Title
            title="Information"
            left={props => <Avatar.Icon {...props} icon="information" />}
          />
          <Card.Content>
            <Paragraph>
              Get Money from your Plastic Waste! It is simple: Give us your
              Plastic Waste, We give you points, Redeem the points for
              Insurance, or money for other bills.
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.card} mode="elevated">
          <Card.Title
            title="My Earnings"
            left={props => (
              <Avatar.Icon
                {...props}
                icon={require('../../images/salary.png')}
              />
            )}
          />
          <Card.Content>
            <Title>10 Points | 200/=</Title>
            <Paragraph>
              1 Point will give you 20/=. The minimum amount to withdraw is
              500/=.
            </Paragraph>
            <Paragraph>
              Note that withdrawal fees apply on the amount and will be deducted
              from your points.
            </Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              icon={require('../../images/money.png')}
              onPress={() => {
                setVisible(false);
                setModalVisible(true);
              }}>
              Withdraw Money
            </Button>
            <Button
              icon={'school'}
              onPress={() => {
                Alert.alert(
                  'Coming Soon!',
                  'The feature for paying for your Insurance needs with points is coming soon.',
                );
              }}>
              Insurance
            </Button>
          </Card.Actions>
        </Card>
        <WithdrawModal
          visible={modalVisible}
          hideModal={() => {
            setVisible(true);
            setModalVisible(false);
          }}
        />
      </Provider>
      <Banner
        style={styles.card}
        visible={bannerVisible}
        actions={[
          {
            label: 'Close',
            onPress: () => setVisible(false),
          },
          {
            label: 'Learn more',
            onPress: () => {
              Alert.alert(
                'Withdrawal Delivery',
                'We deliver withdrawals through different partners. We try as much as possible to deliver the money within 48 hours.',
              );
            },
          },
        ]}>
        Withdrawals may take up to 48 hours!
      </Banner>
    </View>
  );
}

export default RedeemScreen;

const styles = StyleSheet.create({
  card: {
    width: inputsWidth,
    margin: 10,
  },
  containerStyle: {backgroundColor: 'white', padding: 20},
  inputs: {
    width: inputsWidth - 20,
    margin: 10,
  },
});
