import {
  RECOVER_PASSWORD_CODE,
  SAVE_CODE_IN_STORE,
  SAVE_USER_IN_STORE,
  CODE_IS_VERIFIED,
  API_PENDING,
  API_FAILURE,
  API_SUCCESS,
  USER,
  READ,
  ROLES
} from '../actions/actionTypes';

const initialState = {
  person: {},
  email: '',
  authentication_token: '',
  verificationCode: null,
  isCodeVerified: false,
  loading: false,
  roles: [],
  mfaEnabled: false
};

function user(state = initialState, action) {
  switch (action.type) {
    case `${USER} ${READ} ${API_SUCCESS}`:
      return { ...state, ...action.payload, loading: false };
    case `${USER} ${READ} ${API_FAILURE}`:
    case `${RECOVER_PASSWORD_CODE} ${API_SUCCESS}`:
    case `${RECOVER_PASSWORD_CODE} ${API_FAILURE}`:
      return { ...state, loading: false };
    case `${USER} ${READ} ${API_PENDING}`:
    case `${RECOVER_PASSWORD_CODE} ${API_PENDING}`:
      return { ...state, loading: false };
    case SAVE_CODE_IN_STORE:
      return { ...state, verificationCode: action.payload.code, email: action.payload.email };
    case CODE_IS_VERIFIED:
      return { ...state, isCodeVerified: true };
    case SAVE_USER_IN_STORE:
      return { ...state, ...action.payload };
    case `${ROLES} ${READ} ${API_SUCCESS}`:
      return { ...state, roles: action.payload };
    default:
      return { ...state };
  }
}

export default user;
