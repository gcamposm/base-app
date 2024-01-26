/* eslint-disable camelcase */
import * as yup from 'yup';
import { string, number } from './index';
import { floatNumberValidation } from '~/src/utils/constants';
import address from './partials/address';
import contact from './partials/contact';

export const originShipmentValidation = yup.object().shape({
  shipmentForm: yup.object().shape({
    reference: string()
      .min(1, 'El campo debe tener al menos 1 carácter')
      .max(15, 'El campo no puede tener de más de 15 carácteres'),
    origin: yup.object().shape({
      origin_id: yup.number().typeError('Valor erróneo'),
      full_name: string(),
      checkbox_alias_origin: yup.boolean(),
      name: yup.string().when('checkbox_alias_origin', {
        is: true,
        then: field => field.required('Campo requerido')
      }),
      ...contact,
      ...address
    })
  })
});

export const destinyShipmentValidation = yup.object().shape({
  shipmentForm: yup.object().shape({
    destiny: yup.object().when('platform', {
      is: 'sheet',
      then: field =>
        field.shape({
          full_name: string(),
          ...contact,
          phone: yup.string().nullable(),
          courier_branch_office_id: yup
            .number()
            .nullable()
            .when('delivery_id', {
              is: value => (value === '2' ? '2' : false),
              then: courierField => courierField.required()
            }),
          street: yup.string().when('delivery_id', {
            is: '1',
            then: field => field.required('Campo requerido')
          }),
          number: yup.string().when('delivery_id', {
            is: '1',
            then: field => field.required('Campo requerido')
          }),
          commune_id: yup.number().when('delivery_id', {
            is: '1',
            then: field => field.required('Campo requerido').min(1, 'Campo requerido')
          })
        }),
      otherwise: field =>
        field.shape({
          destiny_id: yup.number(),
          full_name: string(),
          ...contact,
          phone: yup.string().nullable(),
          courier_id: yup.number().when('delivery_id', {
            is: value => (value === '2' ? '2' : false),
            then: field => field.positive('Campo requerido').required('Campo requerido')
          }),
          courier_branch_office_id: yup
            .number()
            .nullable()
            .when('delivery_id', {
              is: value => (value === '2' ? '2' : false),
              then: field => field.min(0, 'Campo requerido').required('Campo requerido')
            }),
          street: yup.string().when('delivery_id', {
            is: '1',
            then: field => field.required('Campo requerido')
          }),
          number: yup.string().when('delivery_id', {
            is: '1',
            then: field => field.required('Campo requerido')
          }),
          commune_id: yup.number().when('delivery_id', {
            is: '1',
            then: field => field.required('Campo requerido').min(1, 'Campo requerido')
          }),
          complement: yup
            .string()
            .nullable()
            .notRequired(),
          name: yup.string().when('store', {
            is: true,
            then: field => field.required('Campo requerido')
          })
        })
    })
  })
});

export const sizesShipmentValidation = yup.object().shape({
  shipmentForm: yup.object().shape({
    items: number()
      .min(1, 'Valor incorrecto')
      .nullable()
      .typeError('Campo requerido'),
    sizes: yup.object().shape({
      width: number()
        .min(1, 'Valor incorrecto')
        .nullable()
        .typeError('Campo requerido'),
      height: number()
        .min(1, 'Valor incorrecto')
        .nullable()
        .typeError('Campo requerido'),
      length: number()
        .min(1, 'Valor incorrecto')
        .nullable()
        .typeError('Campo requerido'),
      volumetric_weight: string().nullable(),
      weight: yup
        .string()
        .transform(value => {
          if (floatNumberValidation.test(value)) {
            const data = parseFloat(value.includes(',') ? value.replace(/,/g, '.') : value);
            if (data >= 0.01) {
              return data.toString();
            }
          }
        })
        .required('Números desde 0,01 separados por . ó ,')
        .nullable(),
      name: yup.string().when('store', {
        is: true,
        then: field => field.required('Campo requerido')
      })
    })
  })
});

sizesShipmentValidation.typeError('Campo requerido');
