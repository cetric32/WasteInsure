import _ from 'lodash';
import * as React from 'react';
import {Dimensions, View, StyleSheet, ScrollView, Alert} from 'react-native';
import {List, Avatar, Divider, Text, Title} from 'react-native-paper';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';

const inputsWidth = Dimensions.get('window').width - 25;

function TransactionsScreen(props) {
  console.log(props.withdrawals);

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
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        style={{flex: 1}}>
        {_.map(props.withdrawals.data, d => {
          return (
            <View key={String(d.id)}>
              <List.Item
                style={styles.listItem}
                title={`Redeem ${d.points} pts`}
                description={`${new Date(d.created_at).toLocaleDateString()}`}
                onPress={() => {
                  Alert.alert(
                    'Hi',
                    'All Transactions details coming here soon!',
                  );
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
});
