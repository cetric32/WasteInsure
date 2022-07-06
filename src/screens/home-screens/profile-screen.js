import * as React from 'react';
import {Dimensions, Linking, StyleSheet, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import VersionInfo from 'react-native-version-info';
import {logOutUser} from './../../store/actions';

import {connect} from 'react-redux';
import {SUPPORT_PHONE_NUMBER} from '../../common/constants';

const width = Dimensions.get('window').width - 25;
const inputsWidth = Dimensions.get('window').width - 25;

function ProfileScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'green',
          padding: 2,
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
      <View>
        <Button
          icon="help"
          mode="contained"
          style={[{backgroundColor: '#2AB34A'}, styles.inputs]}
          onPress={() => {
            Linking.openURL(`tel:${SUPPORT_PHONE_NUMBER}`);
          }}>
          Feedback & Help
        </Button>
      </View>
      <View>
        <Button
          icon="login"
          mode="contained"
          loading={props.isSigningOut}
          disabled={props.isSigningOut}
          style={[{backgroundColor: '#2AB34A'}, styles.inputs]}
          onPress={props.logOutUser}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const mapStateToProps = ({user}) => {
  return {
    user: user.userDetails.user,
    isSigningOut: user.isSigningOut,
  };
};

export default connect(mapStateToProps, {logOutUser})(ProfileScreen);

const styles = StyleSheet.create({
  row: {
    width: width,
    marginBottom: 7,
  },
  inputs: {
    width: inputsWidth,
    margin: 10,
  },
});
