import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import WelcomeScreen from './welcome-screen';
import ProfileScreen from './profile-screen';
import RedeemScreen from './redeem-screen';

import {connect} from 'react-redux';
import TransactionsScreen from './transactions';
import CollectWasteScreen from './collect-waste-screen';
import AgentTransactionsScreen from './transactions/agent-transactions-screen';
import UserDeliveriesScreen from './transactions/user-deliveries-screen';
import UpdateAppScreen from './update-screen';

const Tab = createBottomTabNavigator();

function HomeScreen(props) {
  React.useEffect(() => {
    if (!props.isSignedIn) {
      props.navigation.navigate('Login');
    }
  }, [props.isSignedIn]);

  const tabBarActiveTintColor = 'tomato';
  const tabBarInactiveTintColor = 'white';

  const getIconName = (route, focused) => {
    let iconName;
    let image;

    if (route.name === 'Welcome') {
      iconName = focused ? 'home' : 'home';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'user' : 'user';
    } else if (route.name === 'Redeem') {
      iconName = focused ? 'dollar-sign' : 'gift';
    } else if (route.name === 'Transactions') {
      iconName = focused ? 'hand-holding-usd' : 'hand-holding-usd';
      //image = require('../../images/transaction.png');
    } else if (route.name === 'Collect') {
      iconName = focused ? 'plus' : 'plus';
    } else if (route.name === 'Deliveries') {
      iconName = focused ? 'plus' : 'plus';
      //image = require('../../images/deliveries.png');
    }

    return {iconName, image};
  };

  if (props.shouldUpdateApp) {
    return <UpdateAppScreen />;
  } else {
    if (props.isAgent) {
      return (
        <Tab.Navigator
          initialRouteName="Collect"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              const {iconName, image} = getIconName(route, focused);

              // You can return any component that you like here!
              if (image) {
                return <Image source={image} />;
              } else {
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              }
            },
            tabBarActiveTintColor: tabBarActiveTintColor,
            tabBarInactiveTintColor: tabBarInactiveTintColor,
          })}>
          <Tab.Screen name="Transactions" component={AgentTransactionsScreen} />
          <Tab.Screen name="Collect" component={CollectWasteScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      );
    } else {
      return (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              const {iconName, image} = getIconName(route, focused);

              // You can return any component that you like here!
              if (image) {
                return <Image source={image} style={{height: 26, width: 33}} />;
              } else {
                return (
                  <FontAwesome5 name={iconName} size={size} color={color} />
                );
              }
            },
            tabBarActiveTintColor: tabBarActiveTintColor,
            tabBarInactiveTintColor: tabBarInactiveTintColor,
            tabBarStyle: {
              backgroundColor: 'green',
              marginTop: 4,
            },
          })}>
          <Tab.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{title: 'Home', headerShown: false}}
          />
          <Tab.Screen
            name="Redeem"
            component={RedeemScreen}
            options={{title: 'REDEEM'}}
          />
          <Tab.Screen
            name="Transactions"
            component={TransactionsScreen}
            options={{title: 'TRANSACTIONS'}}
          />
          <Tab.Screen
            name="Deliveries"
            component={UserDeliveriesScreen}
            options={{title: 'DELIVERIES'}}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{title: 'PROFILE'}}
          />
        </Tab.Navigator>
      );
    }
  }
}

const mapStateToProps = ({user}) => {
  return {
    isSignedIn: user.isSignedIn,
    isAgent: user.userDetails.user.isAgent,
    shouldUpdateApp: user.userDetails.user.shouldUpdateApp,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
