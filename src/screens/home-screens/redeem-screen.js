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

import {connect} from 'react-redux';
import _ from 'lodash';
import {useEffect} from 'react';
import {getDataStorage} from '../../common/functions';
import {redeemWithdraw} from '../../store/actions';

const inputsWidth = Dimensions.get('window').width - 25;

function WithdrawModal({
  visible,
  hideModal,
  points,
  pointsValue,
  isRedeeming,
  redeemWithdraw,
  minRedeemValue,
}) {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    getDataStorage('lastPhone')
      .then(data => {
        if (data) {
          setPhone(data);
        }
      })
      .catch(() => {});
  }, []);

  const withdraw = () => {
    const amountWithdraw = amount || 0;

    if (amountWithdraw > pointsValue) {
      Alert.alert(
        'Insufficient Funds',
        `The maximum you can try to withdraw is ${pointsValue}/=`,
      );

      return;
    }

    if (amountWithdraw < minRedeemValue) {
      Alert.alert(
        'Insufficient Funds',
        `The minimum you can try to withdraw is ${minRedeemValue}/=`,
      );

      return;
    }

    redeemWithdraw({amount, phone}, () => {
      hideModal();
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Title> Withdraw Mobile Money</Title>
        <Paragraph>
          Your {points} points have a value of {pointsValue}/=. Note that
          withdrawal fees are charged on the points.
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
          loading={isRedeeming}
          disabled={isRedeeming}
          icon={require('../../images/money.png')}
          mode="contained"
          style={[{backgroundColor: 'green'}, styles.inputs]}
          onPress={withdraw}>
          Withdraw
        </Button>
      </Modal>
    </Portal>
  );
}

function RedeemScreen(props) {
  const [bannerVisible, setVisible] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  console.log('isRedeeming', props.isRedeeming);

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
            <Title>
              {_.toNumber(props.userDetails.user.points)} Points |{' '}
              {_.toNumber(
                props.userDetails.user.points *
                  props.redeemConfigs.one_point_amount,
              )}
              /=
            </Title>
            <Paragraph>
              1 Point will give you{' '}
              {_.toNumber(props.redeemConfigs.one_point_amount)}/=. The minimum
              amount to withdraw is{' '}
              {_.toNumber(props.redeemConfigs.min_amount_redeem)}/=.
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
          points={props.userDetails.user.points}
          pointsValue={
            props.userDetails.user.points * props.redeemConfigs.one_point_amount
          }
          isRedeeming={props.isRedeeming}
          redeemWithdraw={props.redeemWithdraw}
          minRedeemValue={props.redeemConfigs.min_amount_redeem}
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
                'Withdrawal Delivery Notice',
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

const mapStateToProps = ({user}) => {
  console.log('user.isRedeeming', user.isRedeeming);
  return {
    userDetails: user.userDetails,
    fetchingRedeemConfigs: user.fetchingRedeemConfigs,
    redeemConfigs: user.redeemConfigs,
    isRedeeming: user.isRedeeming,
  };
};

export default connect(mapStateToProps, {redeemWithdraw})(RedeemScreen);

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
