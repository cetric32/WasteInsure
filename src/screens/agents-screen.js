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
import agents from './agents.json';

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
              Linking.openURL('tel:+254797224768');
            }}>
            Call Support
          </Button>
          <Button
            icon={'email'}
            onPress={() => {
              Linking.openURL('mailto:info@wasteinsure.com');
            }}>
            Email Support
          </Button>
        </Card.Actions>
      </Card>
      <ScrollView>
        {agents.map((agent, key) => {
          return (
            <>
              <List.Item
                key={key}
                title={agent.name}
                description={agent.location}
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
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AgentsScreen;

const styles = StyleSheet.create({});
