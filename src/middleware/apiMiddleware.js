import axios from 'axios';
import { API_REQUEST, API_PENDING, API_SUCCESS, API_FAILURE } from '~/src/actions/actionTypes';

const apiSuccess = (response, action) => {
  const { feature } = action.meta;
  const newAction = {
    type: `${feature} ${API_SUCCESS}`,
    payload: response,
    meta: action.meta
  };
  if (response.data) {
    // TODO: data.error
    newAction.payload = response.data;
    return newAction;
  }
  newAction.type = `${feature} ${API_FAILURE}`;

  return newAction;
};

const apiError = (error, action) => {
  const { feature } = action.meta;

  const newAction = {
    type: `${feature} ${API_FAILURE}`,
    message: error,
    meta: action.meta
  };

  if (error.message) {
    newAction.payload = error.message;
    return newAction;
  }

  return newAction;
};

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);
  if (action.type && action.type.includes(API_REQUEST)) {
    const { feature, api, callback, failureCallback } = action.meta;

    dispatch({ type: `${feature} ${API_PENDING}` });

    return axios({ ...api })
      .then(response => {
        if (typeof callback === 'function') {
          callback(response);
        }
        dispatch(apiSuccess(response, action));
      })
      .catch(error => {
        if (typeof failureCallback === 'function') {
          failureCallback(error);
        }
        dispatch(apiError(error, action));
      });
  }
};

export default apiMiddleware;
