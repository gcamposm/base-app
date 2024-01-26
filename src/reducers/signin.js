import { SIGNIN } from '../actions/actionTypes';

function signin(state = {}, action) {
  switch (action.type) {
    case SIGNIN:
      return { ...state, sign_in: action.payload };
    default:
      return { ...state };
  }
}

export default signin;
