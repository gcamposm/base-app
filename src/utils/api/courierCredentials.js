/* eslint-disable import/prefer-default-export */
import { url, getHeaders } from '../api';

export const requestCourierCredentials = (filters = {}) => ({
  url: `${url}/courier_credentials`,
  headers: { ...getHeaders() },
  method: 'GET',
  params: filters
});

export const requestCourierCredential = courierCredentialId => ({
  url: `${url}/courier_credentials/${courierCredentialId}`,
  headers: { ...getHeaders() },
  method: 'GET'
});

export const createCourierCredential = courierCredential => ({
  url: `${url}/courier_credentials`,
  headers: { ...getHeaders() },
  method: 'POST',
  data: courierCredential
});

export const editCourierCredential = courierCredential => ({
  url: `${url}/courier_credentials/${courierCredential.id}`,
  headers: { ...getHeaders() },
  method: 'PUT',
  data: courierCredential
});

export const requestCredentialKeys = courierServiceTypeId => ({
  url: `${url}/credential_keys/by_courier_service_type`,
  headers: { ...getHeaders() },
  method: 'GET',
  params: { courier_service_type_id: courierServiceTypeId }
});

export const createCredentialKeys = credentialKeys => ({
  url: `${url}/credential_keys/massive`,
  headers: { ...getHeaders() },
  method: 'POST',
  data: { credential_keys: credentialKeys }
});

export const deactivateCourierCredential = id => ({
  url: `${url}/courier_credentials/${id}/deactivate`,
  headers: getHeaders(),
  method: 'PATCH'
});

export const activateCourierCredential = id => ({
  url: `${url}/courier_credentials/${id}/activate`,
  headers: getHeaders(),
  method: 'PATCH'
});

export const deleteCourierCredential = id => ({
  url: `${url}/courier_credentials/${id}`,
  headers: getHeaders(),
  method: 'DELETE'
});
