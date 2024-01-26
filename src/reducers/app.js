import {
  SET_RIGHT_DRAWER_VISIBILITY,
  CHANGE_MESSAGE_DEBTOR,
  UPDATE_DEBTOR_STATUS,
  SET_USER_SERVICE,
  CLEAN_USER_SERVICE,
  USER,
  READ,
  UPDATE,
  CREATE,
  PLANS,
  DATE,
  API_PENDING,
  API_SUCCESS,
  API_FAILURE,
  SET_COMPANY_DATA,
  TIME
} from '../actions/actionTypes';

const initialState = {
  rightDrawerVisibility: false,
  user: {},
  company: {},
  subscription: {
    plan_id: 1
  },
  plans: [],
  currentDate: '',
  time: null,
  loading: true,
  debtorMessage: false
};

function app(state = initialState, action) {
  switch (action.type) {
    case SET_RIGHT_DRAWER_VISIBILITY:
      return { ...state, rightDrawerVisibility: action.payload };
    case SET_USER_SERVICE:
      return { ...state, user: { service: action.payload } };
    case SET_COMPANY_DATA:
      return { ...state, company: action.payload };
    case CLEAN_USER_SERVICE:
      return { ...state, user: {} };
    case CHANGE_MESSAGE_DEBTOR:
      return {
        ...state,
        debtorMessage: !state.debtorMessage,
        company: { ...state.company, debtors: true }
      };
    case `${USER} ${READ} ${API_PENDING}`:
    case `${PLANS} ${READ} ${API_PENDING}`:
    case `${PLANS} ${UPDATE} ${API_PENDING}`:
    case `${PLANS} ${CREATE} ${API_PENDING}`:
    case `${DATE} ${READ} ${API_PENDING}`:
      return { ...state, loading: true };
    case `${USER} ${READ} ${API_SUCCESS}`:
      return { ...state, loading: false, ...action.payload };
    case `${PLANS} ${READ} ${API_SUCCESS}`:
      return { ...state, loading: false, ...action.payload };
    case `${PLANS} ${UPDATE} ${API_SUCCESS}`:
    case `${PLANS} ${CREATE} ${API_SUCCESS}`:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    case `${DATE} ${READ} ${API_SUCCESS}`:
      return {
        ...state,
        loading: false,
        currentDate: action.payload.date
      };
    case `${USER} ${READ} ${API_FAILURE}`:
    case `${PLANS} ${READ} ${API_FAILURE}`:
    case `${PLANS} ${UPDATE} ${API_FAILURE}`:
    case `${PLANS} ${CREATE} ${API_FAILURE}`:
    case `${DATE} ${READ} ${API_FAILURE}`:
      return { ...state, loading: false };
    case `${TIME} ${API_PENDING}`:
      return { ...state, loading: true };
    case `${TIME} ${API_SUCCESS}`:
      return { ...state, loading: false, time: action.payload.current_time };
    case UPDATE_DEBTOR_STATUS:
      return {
        ...state,
        company: { ...state.company, debtors: action.payload.debtor }
      };
    default:
      return { ...state };
  }
}

export default app;
