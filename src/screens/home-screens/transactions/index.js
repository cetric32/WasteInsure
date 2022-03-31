import _ from 'lodash';
import * as React from 'react';
import {useState} from 'react';
import {Dimensions, View, StyleSheet, ScrollView, Alert} from 'react-native';
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
} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

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
                {_.toNumber(transaction.points).toFixed(2)}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Amount</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${_.toNumber(transaction.delivered_amount).toFixed(2)}/=`}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Fees</DataTable.Cell>
              <DataTable.Cell numeric>{`${_.toNumber(transaction.fees).toFixed(
                2,
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
                {`${_.toNumber(transaction.points_before).toFixed(2)}`}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Points After</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${_.toNumber(transaction.points_after).toFixed(2)}`}
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
              <View key={String(d.id)}>
                <List.Item
                  style={styles.listItem}
                  title={`Redeem ${d.points} pts`}
                  description={`${new Date(d.created_at).toLocaleDateString()}`}
                  onPress={() => {
                    setCurrentTransaction(d);
                    setModalVisible(true);
                  }}
                  left={props => (
                    <Avatar.Icon
                      {...props}
                      style={{backgroundColor: 'lightgreen'}}
                      icon={require('../../../images/download.png')}
                    />
                  )}
                  right={props => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Title>{`${d.delivered_amount}/=`}</Title>
                      </View>
                    );
                  }}
                />
                <Divider />
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
