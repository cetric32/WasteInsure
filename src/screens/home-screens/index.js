import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import WelcomeScreen from './welcome-screen';
import SettingsScreen from './settings-screen';
import RedeemScreen from './redeem-screen';

import {connect} from 'react-redux';
import TransactionsScreen from './transactions';
import CollectWasteScreen from './collect-waste-screen';
import AgentTransactionsScreen from './transactions/agent-transactions-screen';

const Tab = createBottomTabNavigator();
function HomeScreen(props) {
  React.useEffect(() => {
    if (!props.isSignedIn) {
      props.navigation.navigate('Login');
    }
  }, [props.isSignedIn]);

  console.log('props.isAgent', props.isAgent);

  const getIconName = (route, focused) => {
    let iconName;

    if (route.name === 'Welcome') {
      iconName = focused ? 'home' : 'home';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'cog' : 'cog';
    } else if (route.name === 'Redeem') {
      iconName = focused ? 'dollar-sign' : 'gift';
    } else if (route.name === 'Transactions') {
      iconName = focused ? 'hand-holding-usd' : 'hand-holding-usd';
    } else if (route.name === 'Collect') {
      iconName = focused ? 'plus' : 'plus';
    }

    return iconName;
  };

  if (props.isAgent) {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = getIconName(route, focused);

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Transactions" component={AgentTransactionsScreen} />
        <Tab.Screen name="Collect" component={CollectWasteScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            const iconName = getIconName(route, focused);

            // You can return any component that you like here!
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{title: 'Home'}}
        />
        <Tab.Screen
          name="Redeem"
          component={RedeemScreen}
          options={{title: 'Redeem'}}
        />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    isSignedIn: user.isSignedIn,
    isAgent: user.userDetails.user.isAgent,
  };
};

export default connect(mapStateToProps, {})(HomeScreen);
