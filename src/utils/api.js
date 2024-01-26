/* eslint-disable camelcase */
import getConfig from 'next/config';
import { getAuthInfo } from './auth';

let api_endpoint;
let auth_endpoint;
let internal_endpoint;
let client_endpoint;
let orders_endpoint;
let prices_endpoint;
let statuses_endpoint;
let notifications_endpoint;
let socket_endpoint;
let elastic_endpoint;
let courier_image_path;
let aws_path;
let courier_path;
let publicRuntimeConfig = null;
const config = getConfig();

if (config) {
  publicRuntimeConfig = config.publicRuntimeConfig.NODE_ENV;
}

if (publicRuntimeConfig) {
  const {
    API_ENDPOINT,
    AUTH_ENDPOINT,
    INTERNAL_ENDPOINT,
    CLIENTES_ENDPOINT,
    ORDERS_ENDPOINT,
    PRICES_ENDPOINT,
    STATUSES_ENDPOINT,
    NOTIFICATIONS_ENDPOINT,
    ELASTIC_ENDPOINT,
    SOCKET_ENDPOINT,
    AWS_PATH,
    COURIER_PATH
  } = config.publicRuntimeConfig;

  api_endpoint = API_ENDPOINT;
  auth_endpoint = AUTH_ENDPOINT;
  internal_endpoint = INTERNAL_ENDPOINT;
  client_endpoint = CLIENTES_ENDPOINT;
  orders_endpoint = ORDERS_ENDPOINT;
  prices_endpoint = PRICES_ENDPOINT;
  statuses_endpoint = STATUSES_ENDPOINT;
  notifications_endpoint = NOTIFICATIONS_ENDPOINT;
  elastic_endpoint = ELASTIC_ENDPOINT;
  socket_endpoint = SOCKET_ENDPOINT;
  aws_path = AWS_PATH;
  courier_path = COURIER_PATH;
  courier_image_path = `${aws_path}${courier_path}`;
} else {
  api_endpoint = 'https://api.shipit.cl/v';
  auth_endpoint = 'https://internal.shipit.cl/v';
  internal_endpoint = 'https://internal.shipit.cl/v';
  client_endpoint = 'https://clientes.shipit.cl/v';
  orders_endpoint = 'https://orders.shipit.cl/v';
  prices_endpoint = 'https://prices.shipit.cl/v';
  statuses_endpoint = 'https://courierstatus.shipit.cl/v';
  notifications_endpoint = 'https://notifications.shipit.cl/v';
  elastic_endpoint = 'https://elastic.shipit.cl/v';
  courier_image_path = 'https://s3.us-west-2.amazonaws.com/shipit-docs/images/couriers/';
}

export const apiUrl = api_endpoint;
export const authUrl = auth_endpoint;
export const url = internal_endpoint;
export const clientUrl = client_endpoint;
export const ordersUrl = orders_endpoint;
export const pricesUrl = prices_endpoint;
export const statusesUrl = statuses_endpoint;
export const notificationsUrl = notifications_endpoint;
export const elasticUrl = elastic_endpoint;
export const socketUrl = socket_endpoint;
export const courierImagePath = courier_image_path;

export const getHeaders = () => {
  const { authentication_token, email } = getAuthInfo();
  return {
    Accept: 'application/vnd.internal.v1',
    'Content-Type': 'application/json',
    'X-Shipit-Access-Token': authentication_token,
    'X-Shipit-Email': email,
    'X-Shipit-Access-Type': 'user'
  };
};

export const getUserId = () => {
  const { id } = getAuthInfo();
  return id;
};

export const getApiHeaders = () => {
  const { authentication_token, email } = getAuthInfo();
  return {
    Accept: 'application/vnd.shipit.v4',
    'Content-Type': 'application/json',
    'X-Shipit-Access-Token': authentication_token,
    'X-Shipit-Email': email,
    'X-Shipit-Access-Type': 'user'
  };
};

export const getOrderHeaders = () => {
  const { authentication_token, email } = getAuthInfo();
  return {
    Accept: 'application/vnd.orders.v1',
    'Content-Type': 'application/json',
    'X-Shipit-Access-Token': authentication_token,
    'X-Shipit-Email': email
  };
};

export const getPricesHeaders = () => {
  const { authentication_token, email } = getAuthInfo();
  return {
    Accept: 'application/vnd.shipit.v4',
    'X-Shipit-Access-Token': authentication_token,
    'X-Shipit-Email': email,
    'Content-Type': 'application/json'
  };
};

export const getStatusesHeaders = () => {
  const { authentication_token, email } = getAuthInfo();
  return {
    Accept: 'application/vnd.shipit.v4',
    'X-Shipit-Access-Token': authentication_token,
    'X-Shipit-Email': email,
    'Content-Type': 'application/json'
  };
};
