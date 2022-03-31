import {
  COLLECT_WASTE,
  COLLECT_WASTE_FAILED,
  COLLECT_WASTE_SUCCESSFUL,
  FETCH_AGENTS,
  FETCH_AGENTS_FAILED,
  FETCH_AGENTS_SUCCESSFUL,
  FETCH_AGENT_COLLECTIONS,
  FETCH_AGENT_COLLECTIONS_FAILED,
  FETCH_AGENT_COLLECTIONS_SUCCESSFUL,
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_FAILED,
  FETCH_COUNTRIES_SUCCESSFUL,
  FETCH_PLASTIC_TYPES,
  FETCH_PLASTIC_TYPES_FAILED,
  FETCH_PLASTIC_TYPES_SUCCESSFUL,
  FETCH_REDEEM_CONFIGS,
  FETCH_REDEEM_CONFIGS_FAILED,
  FETCH_REDEEM_CONFIGS_SUCCESSFUL,
  FETCH_USER,
  FETCH_USER_DELIVERIES,
  FETCH_USER_DELIVERIES_FAILED,
  FETCH_USER_DELIVERIES_SUCCESSFUL,
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESSFUL,
  FETCH_WITHDRAWALS,
  FETCH_WITHDRAWALS_FAILED,
  FETCH_WITHDRAWALS_SUCCESSFUL,
  REDEEM_WITHDRAW,
  REDEEM_WITHDRAW_FAILED,
  REDEEM_WITHDRAW_SUCCESSFUL,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESSFUL,
  USER_LOGOUT,
  USER_LOGOUT_FAILED,
  USER_LOGOUT_SUCCESSFUL,
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
  fetchingUser: false,
  withdrawals: {},
  fetchingWithdrawals: false,
  isSignedIn: false,
  isSigningOut: false,
  agents: [],
  fetchingAgents: false,
  collectingWaste: false,
  plasticTypes: [],
  fetchingPlasticTypes: false,
  agentCollections: {},
  fetchingAgentCollections: false,
  deliveries: {},
  fetchingDeliveries: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {...state, isSigningIn: true};

    case USER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        isSigningIn: false,
        userDetails: action.payload,
        isSignedIn: true,
      };

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

    case FETCH_USER:
      return {...state, fetchingUser: true};

    case FETCH_USER_SUCCESSFUL:
      return {
        ...state,
        fetchingUser: false,
        userDetails: {...state.userDetails, ...action.payload},
      };

    case FETCH_USER_FAILED:
      return {...state, fetchingUser: false};

    case FETCH_WITHDRAWALS:
      return {...state, fetchingWithdrawals: true};

    case FETCH_WITHDRAWALS_SUCCESSFUL:
      return {
        ...state,
        fetchingWithdrawals: false,
        withdrawals: action.payload,
      };

    case FETCH_WITHDRAWALS_FAILED:
      return {...state, fetchingWithdrawals: false};

    case USER_LOGOUT:
      return {...state, isSigningOut: true};

    case USER_LOGOUT_SUCCESSFUL:
      return {...state, isSigningOut: true, isSignedIn: false};

    case USER_LOGOUT_FAILED:
      return {...state, isSigningOut: false};

    case FETCH_AGENTS:
      return {...state, fetchingAgents: true};

    case FETCH_AGENTS_SUCCESSFUL:
      return {...state, fetchingAgents: true, agents: action.payload};

    case FETCH_AGENTS_FAILED:
      return {...state, fetchingAgents: false};

    case COLLECT_WASTE:
      return {...state, collectingWaste: true};

    case COLLECT_WASTE_SUCCESSFUL:
    case COLLECT_WASTE_FAILED:
      return {...state, collectingWaste: false};

    case FETCH_PLASTIC_TYPES:
      return {...state, fetchingPlasticTypes: true};

    case FETCH_PLASTIC_TYPES_SUCCESSFUL:
      return {
        ...state,
        fetchingPlasticTypes: true,
        plasticTypes: action.payload,
      };

    case FETCH_PLASTIC_TYPES_FAILED:
      return {...state, fetchingPlasticTypes: false};

    case FETCH_AGENT_COLLECTIONS:
      return {...state, fetchingAgentCollections: true};

    case FETCH_AGENT_COLLECTIONS_SUCCESSFUL:
      return {
        ...state,
        fetchingAgentCollections: false,
        agentCollections: action.payload,
      };

    case FETCH_AGENT_COLLECTIONS_FAILED:
      return {...state, fetchingAgentCollections: false};

    case FETCH_USER_DELIVERIES:
      return {...state, fetchingDeliveries: true};

    case FETCH_USER_DELIVERIES_SUCCESSFUL:
      return {...state, fetchingDeliveries: false, deliveries: action.payload};

    case FETCH_USER_DELIVERIES_FAILED:
      return {...state, fetchingDeliveries: false};

    default:
      return state;
  }
};

export default UserReducer;
