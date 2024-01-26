import { combineReducers } from 'redux';

import api from './api';
import app from './app';
import courierCredentials from './courierCredentials';
import modal from './modal';
import user from './user';
import whatsappNotifications from './whatsapp';
import xls from './xls';

export default combineReducers({
  api,
  app,
  courierCredentials,
  modal,
  user,
  whatsappNotifications,
  xls
});
