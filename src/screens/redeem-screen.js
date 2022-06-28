import * as React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

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
import {formatNumber, getDataStorage} from '../common/functions';
import {redeemWithdraw} from '../store/actions';

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
          Your {formatNumber(points)} points have a value of{' '}
          {formatNumber(pointsValue)}/=. Note that withdrawal fees are charged
          on the points.
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
          //icon={require('../../images/money.png')}
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

  return (
    <ScrollView
      style={{
        flex: 1,
        margin: 3,
      }}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Paragraph>
          You can redeem your points for mobile money,insurance or pay bills.
        </Paragraph>
      </View>
      <View
        style={[
          styles.viewLinks,
          {backgroundColor: '#C5C619', paddingVertical: 15},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image source={require('../images/points.png')} />
          </View>
          <View>
            <Title style={{color: 'white'}}>
              {formatNumber(props.userDetails.user.points)}
            </Title>
            <Paragraph style={{color: 'white', fontWeight: 'bold'}}>
              Total Points
            </Paragraph>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          setVisible(false);
          setModalVisible(true);
        }}>
        <View style={[styles.viewLinks, {borderColor: 'green'}]}>
          <View>
            <Image source={require('../images/momo.png')} />
            <Paragraph style={styles.viewLinksParagraph}>
              Mobile Money
            </Paragraph>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          Alert.alert(
            'Coming Soon!',
            'The feature for paying for your bills with points is coming soon.',
          );
        }}>
        <View style={[styles.viewLinks, {borderColor: 'green'}]}>
          <View>
            <Image source={require('../images/bills.png')} />
            <Paragraph style={styles.viewLinksParagraph}>Pay Bills</Paragraph>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          Alert.alert(
            'Coming Soon!',
            'The feature for paying for your Insurance needs with points is coming soon.',
          );
        }}>
        <View style={[styles.viewLinks, {borderColor: 'green'}]}>
          <View>
            <Image source={require('../images/insurance.png')} />
            <Paragraph style={styles.viewLinksParagraph}>Insurance</Paragraph>
          </View>
        </View>
      </TouchableOpacity>
      <Provider>
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
      <Paragraph style={{padding: 7}}>
        1 Point will give you{' '}
        {formatNumber(props.redeemConfigs.one_point_amount)}/=. The minimum
        amount to withdraw is{' '}
        {formatNumber(props.redeemConfigs.min_amount_redeem)}
        /=.
      </Paragraph>
      {props.userDetails.user.points * props.redeemConfigs.one_point_amount >=
        props.redeemConfigs.min_amount_redeem && bannerVisible ? (
        <Banner
          style={styles.viewLinks}
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
      ) : (
        <></>
      )}
    </ScrollView>
  );
}

const mapStateToProps = ({user}) => {
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
  viewLinks: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: '94%',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginVertical: 5,
  },
  touchableOpacity: {
    width: '100%',
  },
  viewLinksParagraph: {
    fontWeight: 'bold',
    color: '#707070',
    textAlign: 'center',
  },
});
