import _ from 'lodash';
import {BASE_URL} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import VersionInfo from 'react-native-version-info';

export const getAuthHeader = token => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const httpRequest = async (
  endPoint,
  method = 'GET',
  body = {},
  headers = {},
) => {
  try {
    const url = generateUrl(endPoint);
    let token = '';

    console.log('VersionInfo', VersionInfo);

    let authHeader = {};

    if (!_.includes(['countries', 'login', 'register'], endPoint)) {
      token = await getDataStorage('token');
    }

    if (token) {
      authHeader = getAuthHeader(token);
    }

    let config = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...{
          ...headers,
          ...authHeader,
          ...VersionInfo,
        },
      },
    };

    if (!_.includes(['get'], _.toLower(method)) && !_.isEmpty(body)) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    return response.json();
  } catch (error) {
    Alert.alert(
      'Request error',
      typeof error == 'string' ? error : JSON.stringify(error),
    );
  }
};

export const handleAPIResponse = data => {
  let showMessage = '';
  if (!data) {
    Alert.alert('Error', 'Something went wrong. Please try again later');

    return null;
  } else if (data.errors || data.exception) {
    showMessage = data.message + '\n';

    if (data.errors) {
      for (const key in data.errors) {
        showMessage += ' ->' + data.errors[key][0] + '\n';
      }
    }

    Alert.alert('Error', showMessage);

    return null;
  } else {
    return data;
  }
};

const generateUrl = endPoint => {
  const newBase = _.includes([BASE_URL.substring(BASE_URL.length - 1)], '/')
    ? BASE_URL.substring(0, BASE_URL.length - 1)
    : BASE_URL;

  const url =
    newBase +
    '/' +
    (_.includes(['/'], endPoint[0]) ? endPoint.substring(1) : endPoint);

  return url;
};

export const storeDataStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getDataStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null || jsonValue != undefined
      ? JSON.parse(jsonValue)
      : null;
  } catch (e) {
    console.log(e);
  }
};

export const removeValueStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const formatNumber = (number, currency = null) => {
  return Intl.NumberFormat('en-US').format(number);
};
