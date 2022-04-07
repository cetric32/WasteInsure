import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import VersionInfo from 'react-native-version-info';

import {connect} from 'react-redux';

const width = Dimensions.get('window').width - 25;

function ProfileScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>Name</DataTable.Cell>
        <DataTable.Cell numeric>
          {props.user.name || 'Not Provided'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>Phone Number</DataTable.Cell>
        <DataTable.Cell numeric>{props.user.phone}</DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>Email</DataTable.Cell>
        <DataTable.Cell numeric>
          {props.user.email || 'Not Provided'}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell>App version</DataTable.Cell>
        <DataTable.Cell numeric>{VersionInfo.appVersion}</DataTable.Cell>
      </DataTable.Row>
    </View>
  );
}

const mapStateToProps = ({user}) => {
  return {
    user: user.userDetails.user,
  };
};

export default connect(mapStateToProps, {})(ProfileScreen);

const styles = StyleSheet.create({
  row: {
    width: width,
    marginBottom: 7,
  },
});
