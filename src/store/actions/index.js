import _ from 'lodash';
import {Alert} from 'react-native';
import {
  handleAPIResponse,
  httpRequest,
  storeDataStorage,
} from '../../common/functions';
import {
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_FAILED,
  FETCH_COUNTRIES_SUCCESSFUL,
  FETCH_REDEEM_CONFIGS,
  FETCH_REDEEM_CONFIGS_FAILED,
  FETCH_REDEEM_CONFIGS_SUCCESSFUL,
  REDEEM_WITHDRAW,
  REDEEM_WITHDRAW_FAILED,
  REDEEM_WITHDRAW_SUCCESSFUL,
  REGISTER,
  REGISTER_FAILED,
  REGISTER_SUCCESSFUL,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESSFUL,
} from '../constants';

export const registerUser = (
  details,
  onSuccess = () => {},
  onFailure = () => {},
) => {
  return dispatch => {
    dispatch({
      type: REGISTER,
    });

    const {name, phone, email, password, country_id} = details;

    if (!name) {
      Alert.alert('Name Required', 'Please provide your full name');

      dispatch({
        type: REGISTER_FAILED,
      });

      return;
    }

    if (!phone) {
      Alert.alert('Phone Required', 'Please provide your phone number');

      dispatch({
        type: REGISTER_FAILED,
      });

      return;
    }

    if (!password) {
      Alert.alert('Password Required', 'Please provide password');

      dispatch({
        type: REGISTER_FAILED,
      });

      return;
    }

    if (!country_id) {
      Alert.alert('Country Required', 'Please select your country');

      dispatch({
        type: REGISTER_FAILED,
      });

      return;
    }

    httpRequest('api/register', 'POST', {
      name,
      phone,
      email,
      password,
      ...(_.isEmpty(email) ? {} : {email}),
      country_id,
    })
      .then(data => {
        if (data.exception || data.errors) {
          Alert.alert('Error', data.message);

          dispatch({
            type: REGISTER_FAILED,
          });
        } else {
          dispatch({
            type: REGISTER_SUCCESSFUL,
            payload: data,
          });

          onSuccess();
        }
      })
      .catch(error => {
        dispatch({
          type: REGISTER_FAILED,
        });

        console.log(error);

        Alert.alert(error.message);
      });
  };
};

export const redeemWithdraw = (
  details = {},
  onSuccess = () => {},
  onFailure = () => {},
) => {
  return dispatch => {
    dispatch({
      type: REDEEM_WITHDRAW,
    });

    const {phone, amount} = details;

    if (!amount) {
      Alert.alert(
        'Amount Required',
        'Please provide the amount you wish to redeem',
      );

      dispatch({
        type: REDEEM_WITHDRAW_FAILED,
      });

      return;
    }

    if (!phone) {
      Alert.alert(
        'Phone Number Required',
        'Please provide the phone number to sent money to',
      );

      dispatch({
        type: REDEEM_WITHDRAW_FAILED,
      });

      return;
    }

    httpRequest('api/withdraw', 'POST', {phone, amount})
      .then(data => {
        const newData = handleAPIResponse(data);

        if (newData) {
          dispatch({
            type: REDEEM_WITHDRAW_SUCCESSFUL,
            payload: newData,
          });

          onSuccess();
        } else {
          dispatch({
            type: REDEEM_WITHDRAW_FAILED,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: REDEEM_WITHDRAW_FAILED,
        });

        console.log(error);
      });
  };
};

export const getRedeemConfigs = (
  details = {},
  onSuccess = () => {},
  onFailure = () => {},
) => {
  return dispatch => {
    dispatch({
      type: FETCH_REDEEM_CONFIGS,
    });

    httpRequest('api/settings', 'GET')
      .then(data => {
        const newData = handleAPIResponse(data);

        if (newData) {
          dispatch({
            type: FETCH_REDEEM_CONFIGS_SUCCESSFUL,
            payload: newData,
          });

          onSuccess();
        } else {
          dispatch({
            type: FETCH_REDEEM_CONFIGS_FAILED,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FETCH_REDEEM_CONFIGS_FAILED,
        });

        console.log(error);
      });
  };
};

export const loginUser = (
  details,
  onSuccess = () => {},
  onFailure = () => {},
) => {
  return dispatch => {
    dispatch({
      type: USER_LOGIN,
    });

    const {phone, password} = details;

    if (!phone) {
      Alert.alert('Phone Required', 'Please provide your phone number');

      dispatch({
        type: USER_LOGIN_FAILED,
      });

      return;
    }

    if (!password) {
      Alert.alert('Password Required', 'Please provide your password');

      dispatch({
        type: USER_LOGIN_FAILED,
      });

      return;
    }

    httpRequest('api/login', 'POST', {
      phone,
      password,
    })
      .then(data => {
        const newData = handleAPIResponse(data);

        if (newData) {
          storeDataStorage('token', newData.token)
            .then(() => {})
            .catch(() => {});

          storeDataStorage('lastPhone', phone)
            .then(() => {})
            .catch(() => {});

          dispatch({
            type: USER_LOGIN_SUCCESSFUL,
            payload: data,
          });

          onSuccess();
        } else {
          dispatch({
            type: USER_LOGIN_FAILED,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAILED,
        });

        console.log(error);

        Alert.alert(error.message);
      });
  };
};

export const getCountries = (
  details = {},
  onSuccess = () => {},
  onFailure = () => {},
) => {
  return dispatch => {
    dispatch({
      type: FETCH_COUNTRIES,
    });

    httpRequest('api/countries', 'GET')
      .then(data => {
        const newData = handleAPIResponse(data);

        if (newData) {
          dispatch({
            type: FETCH_COUNTRIES_SUCCESSFUL,
            payload: newData,
          });

          onSuccess();
        } else {
          dispatch({
            type: USER_LOGIN_FAILED,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: FETCH_COUNTRIES_FAILED,
        });

        console.log(error);
      });
  };
};
