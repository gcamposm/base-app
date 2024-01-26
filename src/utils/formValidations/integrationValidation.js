import * as yup from 'yup';
import { string, number } from './index';

export const storeNameIntegrationValidation = yup.object().shape({
  client_id: string(),
  client_secret: string().nullable(),
  store_name: string()
});

export const BsaleIntegrationValidation = yup.object().shape({
  client_secret: string()
});

export const integrationValidation = yup.object().shape({
  client_id: string(),
  client_secret: string().nullable()
});

const zoneNumber = number()
  .integer('Números enteros, sin coma ni puntos')
  .min(0, 'Sólo número por encima de 0')
  .typeError('Campo tiene que ser tipo número')
  .nullable();

const zonesValidation = {
  1: zoneNumber,
  2: zoneNumber,
  3: zoneNumber,
  4: zoneNumber,
  5: zoneNumber,
  6: zoneNumber,
  7: zoneNumber,
  8: zoneNumber,
  9: zoneNumber,
  10: zoneNumber,
  11: zoneNumber,
  12: zoneNumber,
  13: zoneNumber,
  14: zoneNumber,
  15: zoneNumber,
  16: zoneNumber
};

export const shopifyIntegrationValidation = yup.object().shape({
  client_id: string(),
  client_secret: string().nullable(),
  store_name: string(),
  checkout: yup.object().shape({
    rates: yup.object().shape({
      zones: yup.object().shape({
        ...zonesValidation
      })
    })
  })
});

export const woocommerceIntegrationValidation = yup.object().shape({
  client_id: string(),
  client_secret: string().nullable(),
  checkout: yup.object().shape({
    rates: yup.object().shape({
      zones: yup.object().shape({
        ...zonesValidation
      })
    })
  })
});
