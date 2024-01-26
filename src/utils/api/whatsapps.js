import { getHeaders, url } from '../api';

export const requestWhatsappSettings = () => ({
  method: 'GET',
  url: `${url}/whatsapps/setting`,
  headers: getHeaders()
});

export const editWhatsappState = (whatsapp, state, id) => ({
  method: 'PATCH',
  url: `${url}/whatsapps/${state}/active/${id}`,
  headers: getHeaders(),
  data: whatsapp
});

export const requestWhatsappState = state => ({
  method: 'GET',
  url: `${url}/whatsapps/${state}`,
  headers: getHeaders()
});

export const editWhatsappStateTemplate = (state, whatsapp) => ({
  method: 'PATCH',
  url: `${url}/whatsapps/${state}`,
  headers: getHeaders(),
  data: { whatsapp_template: whatsapp }
});

export const whatsappTest = (state, number) => ({
  method: 'POST',
  url: `${url}/whatsapps/${state}/test`,
  headers: getHeaders(),
  data: number
});
