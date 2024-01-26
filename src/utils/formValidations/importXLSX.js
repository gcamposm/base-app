/* eslint-disable camelcase */
/* eslint-disable no-useless-computed-key */
import * as yup from 'yup';
import { string, number, email } from './index';

const getDestinyRules = (delivery_kind, payable, algorithm = null) => {
  let courier = string()
    .notRequired()
    .nullable();

  if (!algorithm || !Object.keys(algorithm).length) {
    courier = string()
      .lowercase()
      .required()
      .oneOf(
        [
          'predeterminado',
          'starken',
          'chilexpress',
          'correoschile',
          'chileparcels',
          'muvsmart',
          'motopartner',
          'bluexpress',
          'shippify'
        ],
        'Elija un Courier de la lista'
      )
      .nullable();
  }

  let destiny = {
    Calle: string(),
    ['Número']: yup
      .string()
      .required('Campo requerido')
      .nullable(),
    ['Comuna Válida']: yup
      .boolean()
      .nullable()
      .oneOf([true], 'La comuna seleccionada no coincide con las comunas de la lista'),
    Complemento: yup.string().nullable(),
    Comuna: string().nullable(),
    ['Destino Válido']: yup
      .boolean()
      .nullable()
      .oneOf(
        [true],
        'El courier seleccionado no tiene destino disponible para la comuna seleccionada'
      ),
    Courier: courier
  };

  if (delivery_kind === 'Sucursal') {
    destiny = {
      ['Sucursal Válido']: yup
        .boolean()
        .oneOf([true], 'Sucursal no seleccionado')
        .nullable(),
      Sucursal: yup
        .string()
        .required('Campo requerido')
        .matches(
          /chilexpress|starken/i,
          'Envío con destino Sucursal puede ser Chilexpress o Starken'
        )
        .nullable()
    };

    if (payable === 'Si') {
      destiny = {
        ...destiny,
        Sucursal: yup
          .string()
          .required('Campo requerido')
          .matches(/starken/i, 'Envío destino Sucursal y por pagar sólo puede ser Starken')
          .nullable()
      };
    }
  }

  return destiny;
};

const changeCourier = (delivery_kind, payable) => {
  let destiny_courier = {};
  if (payable === 'Si' && delivery_kind !== 'Sucursal') {
    destiny_courier = {
      Courier: string()
        .lowercase()
        .required()
        .oneOf(['starken'], 'Envíos por pagar en modo Domicilio sólo puede ser Starken')
        .nullable()
    };
  }

  return destiny_courier;
};

const getFinalRules = (destiny, destiny_courier) => {
  return {
    origin: yup.object().shape({
      ['ID Venta']: string().max(15, 'Máximo 15 carácteres de largo')
    }),
    destiny: yup.object().shape({
      Correo: email(),
      Destinatario: string(),
      ['Teléfono']: yup
        .number()
        .typeError('Sólo se admite número')
        .nullable(),
      ...destiny,
      ...destiny_courier,
      ['Por Pagar']: yup
        .string()
        .notRequired()
        .lowercase()
        .oneOf(['si', 'no', null], 'Tiene que ser si o no')
        .nullable(),
      ['Tipo Entrega']: yup
        .string()
        .notRequired()
        .lowercase()
        .oneOf(['sucursal', 'domicilio', null], 'Tiene que ser Sucursal o Domicilio')
        .nullable()
    })
  };
};

const getInsuranceRules = insurance => {
  let insuranceValidation = {};
  if (insurance && insurance['Seguro adicional'] === 'Si')
    insuranceValidation = {
      insurance: yup.object().shape({
        ['N° documento']: yup
          .string()
          .required('Campo requerido')
          .nullable(),
        ['Contenido']: yup
          .string()
          .required('Campo requerido')
          .nullable(),
        ['Valor declarado']: yup
          .string()
          .required('Campo requerido')
          .nullable(),
        Seguro: yup.object().shape({
          ['Seguro correcto']: yup
            .boolean()
            .nullable()
            .oneOf([true], 'Datos de seguro no válidos'),
          ['Producto correcto']: yup
            .boolean()
            .nullable()
            .oneOf([true], 'Debes seleccionar productos de la lista'),
          ['Valor correcto']: yup
            .boolean()
            .nullable()
            .oneOf([false], 'El valor declarado debe ser entre $70.001 y $1.000.000')
        })
      })
    };
  return insuranceValidation;
};

export const importXlsx = (delivery_kind, payable, algorithm, insurance) => {
  const destiny = getDestinyRules(delivery_kind, payable, algorithm);
  const destiny_courier = changeCourier(delivery_kind, payable);

  return yup.object().shape({
    ...getFinalRules(destiny, destiny_courier),
    ...getInsuranceRules(insurance),
    orderDetails: yup.object().shape({
      Alto: number()
        .positive('Tiene que ser tipo positivo')
        .typeError('Tiene que ser tipo número'),
      Ancho: number()
        .positive('Tiene que ser tipo positivo')
        .typeError('Tiene que ser tipo número'),
      Largo: number()
        .positive('Tiene que ser tipo positivo')
        .typeError('Tiene que ser tipo número'),
      Peso: number()
        .positive('Tiene que ser tipo positivo')
        .typeError('Tiene que ser tipo número')
    })
  });
};

export const importXlsxFulfillment = (delivery_kind, payable, algorithm, insurance) => {
  const destiny = getDestinyRules(delivery_kind, payable, algorithm);
  const destiny_courier = changeCourier(delivery_kind, payable);
  return yup.object().shape({
    ...getFinalRules(destiny, destiny_courier),
    ...getInsuranceRules(insurance),
    orderDetails: yup.object().shape({
      SKU: yup
        .string()
        .required('Campo requerido')
        .nullable(),
      Cantidad: yup
        .string()
        .required('Campo requerido')
        .nullable(),
      ['SKU Existe']: yup
        .boolean()
        .nullable()
        .oneOf([true], 'SKU no existe en bodega'),
      ['SKU Cantidad']: yup
        .boolean()
        .nullable()
        .oneOf([true], 'cantidad de SKU no disponible')
    })
  });
};
