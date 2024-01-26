import { getAuthInfo } from '~/src/utils/auth';
import {
  WHATSAPP_NOTIFICATION,
  WHATSAPP_STATE,
  CREATE,
  READ,
  UPDATE,
  API_REQUEST,
  SET_WHATSAPP_PROPS,
  SET_WHATSAPP_TAB,
  CLEAR_WHATSAPP_TAB
} from './actionTypes';
import * as api from '~/src/utils/api/whatsapps';

export const requestWhatsappSettings = () => dispatch => {
  const feature = `${WHATSAPP_NOTIFICATION} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.requestWhatsappSettings(),
      feature
    }
  });
};

export const editWhatsappState = (name, value) => (dispatch, getState) => {
  const { id, notification } = getState().whatsappNotifications.whatsappStates;
  notification.buyer.whatsapp.state[name].active = value;
  const feature = `${WHATSAPP_NOTIFICATION} ${UPDATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.editWhatsappState(notification, name, id),
      feature
    }
  });
};

export const requestWhatsappNotificationState = state => dispatch => {
  const feature = `${WHATSAPP_STATE} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.requestWhatsappState(state),
      feature
    }
  });
};

const structureData = (whatsappType, whatsappProps) => {
  const cookies = getAuthInfo();
  const formattedData = {
    company_id: cookies.company.id,
    text: {
      subject: whatsappProps.subject,
      tracking_text: whatsappProps.tracking_text,
      one: whatsappProps.one
    },
    valid_format: true,
    state: whatsappType
  };
  return formattedData;
};

export const editWhatsappNotificationState = (whatsappType, callback) => (dispatch, getState) => {
  const {
    whatsappNotifications: { whatsappProps }
  } = getState();
  const data = structureData(whatsappType, whatsappProps);

  const feature = `${WHATSAPP_STATE} ${UPDATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.editWhatsappStateTemplate(whatsappType, data),
      feature,
      callback
    }
  });
};

export const whatsappTestRequest = (whatsappType, number) => dispatch => {
  const feature = `${WHATSAPP_NOTIFICATION} ${CREATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.whatsappTest(whatsappType, { number }),
      feature
    }
  });
};

export const setWhatsappProps = payload => dispatch => {
  dispatch({ type: SET_WHATSAPP_PROPS, payload });
};

export const setWhatsappTab = (payload = {}) => dispatch => {
  dispatch({ type: SET_WHATSAPP_TAB, payload });
};

export const clearWhatsappTab = (payload = {}) => dispatch => {
  dispatch({ type: CLEAR_WHATSAPP_TAB, payload });
};
