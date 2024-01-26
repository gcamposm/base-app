import * as yup from 'yup';
import { validate } from 'rut.js';

export const string = (message = 'Campo requerido') =>
  yup
    .string()
    .required(message)
    .nullable();

export const number = (message = 'Campo requerido') => yup.number().required(message);

export const email = (message = 'Tiene que ser correo váido') =>
  yup
    .string()
    .email(message)
    .nullable();

export const rut = () =>
  yup
    .string()
    .min(4, 'Rut/Run inválido')
    .test({
      message: 'Rut/Run inválido',
      test: value => {
        const result = validate(value);
        return result;
      }
    });

export const sizes = () =>
  yup
    .string()
    .required('Campo requerido')
    .nullable();

export const bool = (message = 'Campo requerido') =>
  yup
    .bool()
    .required(message)
    .nullable();
