import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Linking,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  Card,
  Paragraph,
  Button,
  List,
  Avatar,
  Divider,
} from 'react-native-paper';
import {SUPPORT_MAIL, SUPPORT_PHONE_NUMBER} from '../common/constants';
import {connect} from 'react-redux';

const inputsWidth = Dimensions.get('window').width - 25;

const AgentsScreen = props => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{width: inputsWidth}} mode="elevated">
        <Card.Title
          title="Information"
          left={props => <Avatar.Icon {...props} icon="information" />}
        />
        <Card.Content>
          <Paragraph>
            This is where you will find the Agent nearest you whom you will
            contact to help you deliver your plastic waste.
          </Paragraph>
          <Paragraph>
            You can also contact support to help you find the nearest Agent to
            collect your Plastic Waste
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            icon={'phone'}
            onPress={() => {
              Linking.openURL(`tel:${SUPPORT_PHONE_NUMBER}`);
            }}>
            Call Support
          </Button>
          <Button
            icon={'email'}
            onPress={() => {
              Linking.openURL(`mailto:${SUPPORT_MAIL}`);
            }}>
            Email Support
          </Button>
        </Card.Actions>
      </Card>
      <ScrollView>
        {props.agents.map((agent, key) => {
          return (
            <View key={String(agent.id)}>
              <List.Item
                title={agent.name}
                description={agent.address}
                left={props => <List.Icon {...props} icon="map-marker" />}
                style={{
                  width: inputsWidth,
                }}
                right={props => {
                  return (
                    <View>
                      <Button
                        icon={'phone'}
                        onPress={() => {
                          Linking.openURL(`tel:${agent.phone}`);
                        }}></Button>
                      <Button
                        icon={'email'}
                        onPress={() => {
                          Linking.openURL(`mailto:${agent.email}`);
                        }}></Button>
                    </View>
                  );
                }}
              />
              <Divider />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({user}) => {
  return {
    agents: user.agents,
  };
};

export default connect(mapStateToProps, {})(AgentsScreen);

const styles = StyleSheet.create({});
