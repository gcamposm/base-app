/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
import { authUrl, url, getHeaders, getUserId } from '../api';

export const login = form => ({
  method: 'POST',
  data: { user: form },
  url: `${authUrl}/login`,
  headers: { 'Content-Type': 'application/json' }
});

export const connection = form => ({
  method: 'POST',
  data: { user: form },
  url: `${authUrl}/connection`,
  headers: { 'Content-Type': 'application/json' }
});

export const sendRecoveryCodeToEmail = email => ({
  url: `${authUrl}/reset_password`,
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET',
  params: { email }
});

export const passwordReset = (password, password_confirmation, email) => ({
  url: `${authUrl}/passwords`,
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  data: { password, password_confirmation, email }
});

export const requestRoles = params => ({
  url: `${url}/users/${getUserId()}/roles`,
  headers: getHeaders(),
  params,
  method: 'GET'
});
