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
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESSFUL,
} from '../constants';

const initialState = {
  userDetails: {},
  isSigningIn: false,
  isRegistering: false,
  countries: [],
  fetchingCountries: false,
  redeemConfigs: {},
  fetchingRedeemConfigs: false,
  isRedeeming: false,
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, isSigningIn: true};

    case USER_LOGIN_SUCCESSFUL:
      return {...state, isSigningIn: false, userDetails: action.payload};

    case USER_LOGIN_FAILED:
      return {...state, isSigningIn: false};

    case FETCH_COUNTRIES:
      return {
        ...state,
        fetchingCountries: true,
      };

    case FETCH_COUNTRIES_SUCCESSFUL:
      return {
        ...state,
        fetchingCountries: false,
        countries: action.payload,
      };

    case FETCH_COUNTRIES_FAILED:
      return {
        ...state,
        fetchingCountries: false,
      };

    case FETCH_REDEEM_CONFIGS:
      return {...state, fetchingRedeemConfigs: true};

    case FETCH_REDEEM_CONFIGS_SUCCESSFUL:
      return {
        ...state,
        fetchingRedeemConfigs: false,
        redeemConfigs: action.payload,
      };

    case FETCH_REDEEM_CONFIGS_FAILED:
      return {...state, fetchingRedeemConfigs: false};

    case REDEEM_WITHDRAW:
      return {...state, isRedeeming: true};

    case REDEEM_WITHDRAW_SUCCESSFUL:
    case REDEEM_WITHDRAW_FAILED:
      return {...state, isRedeeming: false};

    default:
      return state;
  }
};
export default UserReducer;
