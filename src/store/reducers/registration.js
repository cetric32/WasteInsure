import {REGISTER_SUCCESSFUL} from '../constants';
const initialState = {
  pageList: [],
};
const RegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        pageList: [],
      };
    default:
      return state;
  }
};
export default RegistrationReducer;
