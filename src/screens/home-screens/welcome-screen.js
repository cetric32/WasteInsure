import * as React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Title, Paragraph} from 'react-native-paper';
import {connect} from 'react-redux';
import {getRedeemConfigs} from '../../store/actions';

import {useEffect} from 'react';
import _ from 'lodash';
import {formatNumber} from '../../common/functions';

const inputsWidth = Dimensions.get('window').width - 25;

const LeftContent = props => <Avatar.Icon {...props} icon="recycle" />;

function WelcomeScreen(props) {
  useEffect(props.getRedeemConfigs, []);

  return (
    <ScrollView
      style={{flex: 1, marginTop: 5, paddingTop: 5}}
      contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={{margin: 3}}>
        <Title>Do you have plastic</Title>
        <Paragraph>
          Give us plastic,we give you points to redeem for insurance and money.
        </Paragraph>
      </View>

      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          props.navigation.navigate('Agents');
        }}>
        <View style={styles.viewLinks}>
          <Image source={require('../../images/agents.png')} />
          <Title style={{color: 'white'}}>Agent</Title>
          <Paragraph>Find the nearest collection centres</Paragraph>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => {
          props.navigation.navigate('Redeem');
        }}>
        <View style={styles.viewLinks}>
          <Image source={require('../../images/redeem.png')} />
          <Title style={{color: 'white'}}>Redeem</Title>
          <Paragraph>Receive your earnings</Paragraph>
        </View>
      </TouchableOpacity>

      <View style={{width: '100%', padding: 5, alignSelf: 'center'}}>
        <Title>Summary</Title>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginHorizontal: 7,
          }}>
          <View style={styles.summaryView}>
            <Image
              style={styles.imageSummary}
              source={require('../../images/points.png')}
            />
            <Title>{formatNumber(props.userDetails.user.points)}</Title>
            <Paragraph>Total Points</Paragraph>
          </View>
          <View style={styles.summaryView}>
            <Image
              style={styles.imageSummary}
              source={require('../../images/money-total.png')}
            />
            <Title>
              {formatNumber(
                props.userDetails.user.points *
                  props.redeemConfigs.one_point_amount,
              )}
              /=
            </Title>
            <Paragraph>Cash to Redeem</Paragraph>
          </View>
        </View>
        <View style={{margin: 4}}>
          <Paragraph>
            1 point = {formatNumber(props.redeemConfigs.one_point_amount)}/={' '}
          </Paragraph>
          <Paragraph>
            The minimum amount you can redeem is{' '}
            {formatNumber(props.redeemConfigs.min_amount_redeem)}
            /=
          </Paragraph>
        </View>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = ({user}) => {
  return {
    userDetails: user.userDetails,
    fetchingRedeemConfigs: user.fetchingRedeemConfigs,
    redeemConfigs: user.redeemConfigs,
  };
};

export default connect(mapStateToProps, {getRedeemConfigs})(WelcomeScreen);

const styles = StyleSheet.create({
  card: {
    width: inputsWidth,
    margin: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  summaryView: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
    padding: 5,
    width: '49%',
    margin: 5,
    alignItems: 'center',
  },
  imageSummary: {
    width: 50,
    height: 50,
    resizeMode: 'stretch',
  },
  viewLinks: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    width: '94%',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 3,
  },
  touchableOpacity: {
    width: '100%',
  },
});
