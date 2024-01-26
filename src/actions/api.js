import { API_REQUEST, READ, UPDATE, API } from './actionTypes';
import * as api from '~/src/utils/api/apiConfiguration';

export const requestApiConfiguration = () => (dispatch, getState) => {
  const companyId = getState().companies.company.id;
  const feature = `${API} ${READ}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      api: api.requestApiConfiguration(companyId),
      feature
    }
  });
};

export const editApiConfiguration = values => (dispatch, getState) => {
  const companyId = getState().companies.company.id;
  const { webhook } = getState().api.configuration;
  const newWebhook = {
    webhook: {
      ...webhook,
      package: {
        ...webhook.package,
        url: values.url
      },
      sandbox: values.sandbox_active
    }
  };
  const feature = `${API} ${UPDATE}`;
  dispatch({
    type: `${feature} ${API_REQUEST}`,
    meta: {
      feature,
      api: api.editApiConfiguration(newWebhook, companyId),
      notifications: {
        successMessage: 'Tu configuración ha sido guardada',
        failureMessage: 'Falló la actualización de la configuración'
      },
      mixpanel: {
        event: 'API Configuration Info Update',
        props: {
          url: values.url,
          sandbox: values.sandbox_active
        }
      }
    }
  });
};
