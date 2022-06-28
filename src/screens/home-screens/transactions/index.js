import _ from 'lodash';
import * as React from 'react';
import {useState} from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  List,
  Avatar,
  Divider,
  Text,
  Title,
  Portal,
  Modal,
  Provider,
  Card,
  DataTable,
  Paragraph,
} from 'react-native-paper';

import {connect} from 'react-redux';
import {formatNumber} from '../../../common/functions';

const inputsWidth = Dimensions.get('window').width - 25;
const height = Dimensions.get('window').height - 10;

function TransactionModal({visible, hideModal, transaction}) {
  console.log('====================================');
  console.log('transaction', transaction);
  console.log('====================================');
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <Card>
          <Card.Content>
            <Title> Withdraw Mobile Money</Title>
            <DataTable.Row>
              <DataTable.Cell>Points</DataTable.Cell>
              <DataTable.Cell numeric>
                {formatNumber(transaction.points)}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Amount</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${formatNumber(transaction.delivered_amount)}/=`}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Fees</DataTable.Cell>
              <DataTable.Cell numeric>{`${formatNumber(
                transaction.fees,
              )}/=`}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Status</DataTable.Cell>
              <DataTable.Cell numeric>{`${_.startCase(
                transaction.status,
              )}`}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Points Before</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${formatNumber(transaction.points_before)}`}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Points After</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${formatNumber(transaction.points_after)}`}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Delivered To</DataTable.Cell>
              <DataTable.Cell numeric>
                {transaction.type == 'momo'
                  ? `${JSON.parse(transaction.delivery_details).momo_number}`
                  : ''}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Transaction Reference</DataTable.Cell>
              <DataTable.Cell numeric>
                {transaction.transaction_id}
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Date</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${new Date(transaction.created_at).toLocaleDateString()}`}
              </DataTable.Cell>
            </DataTable.Row>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
}

function TransactionsScreen(props) {
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  if (
    _.isEmpty(props.withdrawals) ||
    (_.isEmpty(props.withdrawals.data) && props.withdrawals.current_page == 1)
  ) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>You don't have any transactions yet!</Text>
      </View>
    );
  } else {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: height,
        }}
        style={{flex: 1}}>
        <Provider>
          <TransactionModal
            visible={modalVisible}
            hideModal={() => {
              setModalVisible(false);
            }}
            transaction={currentTransaction}
          />
          {_.map(props.withdrawals.data, d => {
            return (
              <View key={String(d.id)} style={{margin: 5}}>
                <TouchableOpacity
                  onPress={() => {
                    setCurrentTransaction(d);
                    setModalVisible(true);
                  }}
                  style={{width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      alignSelf: 'center',
                      paddingHorizontal: 8,
                    }}>
                    <View style={{width: '20%'}}>
                      <Image
                        source={require('../../../images/transaction-money.png')}
                      />
                    </View>
                    <View style={{width: '45%', paddingLeft: 5}}>
                      <Title>{`${formatNumber(d.delivered_amount)}/=`}</Title>
                      <Paragraph>Points: {formatNumber(d.points)}</Paragraph>
                    </View>
                    <View style={{width: '35%'}}>
                      <Title></Title>
                      <Paragraph>
                        Date: {`${new Date(d.created_at).toLocaleDateString()}`}
                      </Paragraph>
                    </View>
                  </View>
                </TouchableOpacity>

                <Divider style={{backgroundColor: '#2AB34A'}} />
              </View>
            );
          })}
        </Provider>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    withdrawals: user.withdrawals,
  };
};

export default connect(mapStateToProps, {})(TransactionsScreen);

const styles = StyleSheet.create({
  listItem: {
    width: inputsWidth,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 5,
    margin: 10,
  },
});
