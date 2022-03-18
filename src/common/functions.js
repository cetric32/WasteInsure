import _ from 'lodash';
import {BASE_URL} from './constants';

export const httpRequest = async (
  endPoint,
  method = 'GET',
  body = {},
  headers = {},
) => {
  try {
    const url = generateUrl(endPoint);

    let config = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    if (!_.includes(['get'], _.toLower(method)) && !_.isEmpty(body)) {
      config.body = body;
    }

    const response = await fetch(url, config);

    return response.json();
  } catch (error) {}
};

const generateUrl = endPoint => {
  return (
    _.replace(BASE_URL, '/', '') +
    '/' +
    (endPoint[0] == '/' ? endPoint.substring(1) : endPoint)
  );
};
