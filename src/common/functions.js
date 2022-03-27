import _ from 'lodash';
import {BASE_URL} from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

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

    console.log('body', body);

    //check if there is a token
    let authHeader = {};
    const token = await getDataStorage('token');

    console.log('token', token);

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
        },
      },
    };

    if (!_.includes(['get'], _.toLower(method)) && !_.isEmpty(body)) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const handleAPIResponse = data => {
  if (data.exception || data.errors) {
    Alert.alert('Error', data.message);

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

  console.log('url', url);

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
    return jsonValue != null ? JSON.parse(jsonValue) : null;
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
