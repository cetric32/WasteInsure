import _ from 'lodash';
import * as React from 'react';
import {useState} from 'react';
import {Dimensions, View, StyleSheet, ScrollView} from 'react-native';
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
            <Title> Delivered Plastic Waste</Title>
            <DataTable.Row>
              <DataTable.Cell>Quantity</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${formatNumber(transaction.quantity)} KG`}
              </DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Points</DataTable.Cell>
              <DataTable.Cell numeric>
                {`${formatNumber(transaction.points)}`}
              </DataTable.Cell>
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
              <DataTable.Cell>Plastic Type</DataTable.Cell>
              <DataTable.Cell numeric>
                {transaction.plastic_name}
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Collection Center</DataTable.Cell>
              <DataTable.Cell
                numeric>{`${transaction.center_name}`}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Agent Name</DataTable.Cell>
              <DataTable.Cell
                numeric>{`${transaction.agent_name}`}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Transaction ID</DataTable.Cell>
              <DataTable.Cell numeric>{transaction.id}</DataTable.Cell>
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

function UserDeliveriesScreen(props) {
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
                  title={`${d.plastic_name}`}
                  description={`${new Date(d.created_at).toLocaleDateString()}`}
                  onPress={() => {
                    setCurrentTransaction(d);
                    setModalVisible(true);
                  }}
                  left={props => (
                    <Avatar.Icon
                      {...props}
                      style={{backgroundColor: 'lightgreen'}}
                      icon={require('../../../images/upload.png')}
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
                        <Title>{`${d.quantity} KG`}</Title>
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
    withdrawals: user.deliveries,
  };
};

export default connect(mapStateToProps, {})(UserDeliveriesScreen);

const styles = StyleSheet.create({
  listItem: {
    width: inputsWidth,
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 5,
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
