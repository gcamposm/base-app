import {
  SET_RIGHT_DRAWER_VISIBILITY,
  SET_USER_SERVICE,
  SET_COMPANY_DATA,
  USER,
  PLANS,
  READ,
  UPDATE,
  DATE,
  API_REQUEST,
  API_SUCCESS,
  CREATE,
  TIME
} from './actionTypes';
import * as api from '~/src/utils/api/app';

export const setRightDrawerVisibility = visibility => dispatch => {
  dispatch({ type: SET_RIGHT_DRAWER_VISIBILITY, payload: visibility });
};

export const setUserService = payload => dispatch => {
  dispatch({ type: SET_USER_SERVICE, payload });
};

export const setCompanyData = payload => dispatch => {
  dispatch({ type: SET_COMPANY_DATA, payload });
};

export const requestUserPlan = () => (dispatch, getState) => {
  const companyId = getState().companies.company.id;
  const feature = `${USER} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.requestUserPlan(companyId),
      feature
    }
  });
};

export const requestPlans = () => dispatch => {
  const feature = `${PLANS} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.requestPlans(),
      feature
    }
  });
};

export const updateUserPlan = payload => dispatch => {
  dispatch({ type: `${PLANS} ${UPDATE} ${API_SUCCESS}`, payload });

  const feature = `${PLANS} ${UPDATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.updateUserPlan(payload),
      feature,
      callback: () => {
        dispatch(requestUserPlan());
      }
    }
  });
};

export const getDate = () => dispatch => {
  const feature = `${DATE} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.getDate(),
      feature
    }
  });
};

export const createUserPlan = (payload, callback) => dispatch => {
  const feature = `${PLANS} ${CREATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.createUserPlan(payload),
      feature,
      callback
    }
  });
};

export const requestServerTime = () => dispatch => {
  const feature = `${TIME}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.requestServerTime(),
      feature
    }
  });
};
