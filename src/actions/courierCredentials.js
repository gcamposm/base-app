import { notification } from 'antd';
import {
  CREATE,
  READ,
  READ_SINGLE,
  UPDATE,
  DELETE,
  API_REQUEST,
  COURIER_CREDENTIALS,
  CLEAN_COURIER_CREDENTIAL_KEYS,
  ADD_COURIER_CREDENTIAL_KEY,
  DELETE_COURIER_CREDENTIAL_KEY,
  CREDENTIAL_KEYS,
  SET_WANT_ADD_BASE_KEY,
  SET_SHOW_COURIER_CREDENTIAL_KEYS,
  SET_COURIER_SERVICE_TYPE_ID,
  SET_COURIER_CREDENTIAL_KEY_ID,
  CLEAN_COURIER_CREDENTIAL_RULES,
  ADD_COURIER_CREDENTIAL_RULE,
  DELETE_COURIER_CREDENTIAL_RULE,
  HIDDE_COURIER_CREDENTIAL_TYPE,
  CLEAN_COURIER_CREDENTIAL,
  DEACTIVATE,
  ACTIVATE
} from './actionTypes';
import * as api from '~/src/utils/api/courierCredentials';

export const requestCourierCredentials = (filters = {}) => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${READ}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.requestCourierCredentials(filters)
    }
  });
};

export const requestCourierCredential = courierCredentialId => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${READ_SINGLE}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.requestCourierCredential(courierCredentialId),
      notifications: {
        successMessage: 'Credencial de Courier cargada'
      }
    }
  });
};

export const createCourierCredential = (credentialKey, callback) => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${CREATE}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.createCourierCredential(credentialKey),
      notifications: {
        successMessage: 'Credencial creada con éxito'
      },
      failureCallback: res => {
        notification.error({ message: res.response.data.message, duration: 3 });
      },
      callback
    }
  });
};

export const editCourierCredential = (courierCredential, callback) => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${UPDATE}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.editCourierCredential(courierCredential),
      notifications: {
        successMessage: 'Credencial actualizada con éxito'
      },
      failureCallback: res => {
        notification.error({ message: res.response.data.message, duration: 3 });
      },
      callback
    }
  });
};

export const requestCredentialKeys = courierServiceTypeId => dispatch => {
  const feature = `${CREDENTIAL_KEYS} ${READ}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.requestCredentialKeys(courierServiceTypeId)
    }
  });
};

export const createCredentialKeys = (credentialKeys, callback) => dispatch => {
  const feature = `${CREDENTIAL_KEYS} ${CREATE}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.createCredentialKeys(credentialKeys),
      notifications: {
        failureMessage: 'No se pudo crear la base'
      },
      callback
    }
  });
};

export const deactivateCourierCredential = id => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${DEACTIVATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.deactivateCourierCredential(id),
      notifications: {
        successMessage: 'Credencial de Courier desactivada'
      },
      failureCallback: () => {
        notification.error({ message: 'Error al desactivar Credencial de Courier', duration: 3 });
      }
    }
  });
};

export const activateCourierCredential = id => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${ACTIVATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.activateCourierCredential(id),
      notifications: {
        successMessage: 'Credencial de Courier activada'
      },
      failureCallback: () => {
        notification.error({ message: 'Error al activar Credencial de Courier', duration: 3 });
      }
    }
  });
};

export const deleteCourierCredential = id => dispatch => {
  const feature = `${COURIER_CREDENTIALS} ${DELETE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.deleteCourierCredential(id),
      notifications: {
        successMessage: 'Credencial de Courier eliminada'
      },
      failureCallback: () => {
        notification.error({ message: 'Error al eliminar Credencial de Courier', duration: 3 });
      }
    }
  });
};

export const clearCourierCredentialKeys = () => dispatch => {
  dispatch({ type: CLEAN_COURIER_CREDENTIAL_KEYS });
};

export const addCourierCredentialKey = payload => dispatch => {
  dispatch({ type: ADD_COURIER_CREDENTIAL_KEY, payload });
};

export const deleteCourierCredentialKey = payload => dispatch => {
  dispatch({ type: DELETE_COURIER_CREDENTIAL_KEY, payload });
};

export const setWantAddBaseKey = payload => dispatch => {
  dispatch({ type: SET_WANT_ADD_BASE_KEY, payload });
};

export const setShowCourierCredentialKeys = payload => dispatch => {
  dispatch({ type: SET_SHOW_COURIER_CREDENTIAL_KEYS, payload });
};

export const setCourierServiceTypeId = payload => dispatch => {
  dispatch({ type: SET_COURIER_SERVICE_TYPE_ID, payload });
};

export const setCourierCredentialKeyId = payload => dispatch => {
  dispatch({ type: SET_COURIER_CREDENTIAL_KEY_ID, payload });
};

export const cleanCourierCredentialRules = () => dispatch => {
  dispatch({ type: CLEAN_COURIER_CREDENTIAL_RULES });
};

export const addCourierCredentialRule = payload => dispatch => {
  dispatch({ type: ADD_COURIER_CREDENTIAL_RULE, payload });
};

export const deleteCourierCredentialRule = payload => dispatch => {
  dispatch({ type: DELETE_COURIER_CREDENTIAL_RULE, payload });
};

export const hiddeCourierCredentialType = payload => dispatch => {
  dispatch({ type: HIDDE_COURIER_CREDENTIAL_TYPE, payload });
};

export const cleanCourierCredential = () => dispatch => {
  dispatch({ type: CLEAN_COURIER_CREDENTIAL });
};
