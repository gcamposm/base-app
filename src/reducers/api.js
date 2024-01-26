import { API, READ, UPDATE, API_SUCCESS, API_PENDING, API_FAILURE } from '../actions/actionTypes';

const initialState = {
  configuration: {
    id: '',
    company_id: '',
    email: '',
    authentication_token: '',
    webhook: {
      package: {
        url: '',
        options: {
          sign_body: {
            required: false,
            token: ''
          },
          authorization: {
            required: false,
            kind: 'Basic',
            token: ''
          }
        }
      },
      pickup: {
        url: null,
        options: {
          sign_body: {
            required: false,
            token: ''
          },
          authorization: {
            required: false,
            kind: 'Basic',
            token: ''
          }
        }
      }
    },
    sandbox: false
  },
  loading: false
};

function api(state = initialState, action) {
  switch (action.type) {
    case `${API} ${READ} ${API_SUCCESS}`:
    case `${API} ${UPDATE} ${API_SUCCESS}`:
      return { ...state, configuration: action.payload, loading: false };
    case `${API} ${READ} ${API_PENDING}`:
    case `${API} ${UPDATE} ${API_PENDING}`:
      return { ...state, loading: true };
    case `${API} ${READ} ${API_FAILURE}`:
    case `${API} ${UPDATE} ${API_FAILURE}`:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
}

export default api;
