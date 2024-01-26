/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
import Router from 'next/router';
import { notification } from 'antd';

import {
  USER,
  READ,
  API_REQUEST,
  RECOVER_PASSWORD,
  RECOVER_PASSWORD_CODE,
  RESET_PASSWORD_USER,
  SAVE_CODE_IN_STORE,
  SAVE_USER_IN_STORE,
  CODE_IS_VERIFIED,
  CLEAN_USER_SERVICE,
  ROLES
} from './actionTypes';
import * as api from '~/src/utils/api/user';
import { setAuth, destroySession } from '~/src/utils/auth';

export const login = form => dispatch => {
  const feature = `${USER} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.login(form),
      feature,
      notifications: {
        successMessage: 'Has iniciado sesión'
      },
      callback: res => {
        setAuth(res.data, form);
        Router.push('/backoffice');
      },
      failureCallback: res => {
        notification.error({ message: res.response.data.message, duration: 3 });
      }
    }
  });
};

export const connection = form => dispatch => {
  const feature = `${USER} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.connection(form),
      feature,
      notifications: {
        successMessage: 'Zamiz entregara la frase del dia de manera random'
      },
      callback: res => {
        dispatch({ type: SAVE_USER_IN_STORE, payload: res.data });
        setAuth(res.data, form);
      },
      failureCallback: _res => {
        Router.push('/login');
      }
    }
  });
};

export const logout = () => dispatch => {
  dispatch({ type: CLEAN_USER_SERVICE });
  destroySession();
  notification.success({ message: '¡Hasta luego!', duration: 5 });
};

export const sendRecoveryCodeToEmail = email => dispatch => {
  const feature = `${RECOVER_PASSWORD_CODE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.sendRecoveryCodeToEmail(email),
      feature,
      notifications: {
        successMessage: 'Mensaje enviado a usuario',
        failureMessage: 'Usuario no encontrado, favor ingresar email existente'
      },
      callback: res => {
        dispatch({ type: SAVE_CODE_IN_STORE, payload: { code: res.data.code, email } || null });
      }
    }
  });
};

export const passwordReset = (password, password_confirmation, callback) => (
  dispatch,
  getState
) => {
  const { email } = getState().account;

  const feature = `${RESET_PASSWORD_USER}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.passwordReset(password, password_confirmation, email),
      feature,
      notifications: {
        successMessage: 'Contraseña Reseteada',
        failureMessage: 'Error al resetear contraseña'
      },
      callback: res => {
        callback(res);
      }
    }
  });
};

export const requestRoles = () => dispatch => {
  const feature = `${ROLES} ${READ}`;

  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.requestRoles()
    }
  });
};

export async function getMfaQr(mfaSecret) {
  const res = await fetch('/mfa_qr_code', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mfaSecret })
  });

  return res.json();
}

export const validateCode = () => dispatch => {
  dispatch({ type: CODE_IS_VERIFIED });
};

export const recoverPassword = () => dispatch => {
  dispatch({ type: RECOVER_PASSWORD, payload: 'envia datos a servidor' });
};
