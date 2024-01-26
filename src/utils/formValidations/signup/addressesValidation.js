import * as yup from 'yup';
import { string, number } from '../index';
import address from '../partials/address';
import contact from '../partials/contact';

const addressesesValidation = yup.object().shape({
  first_name: string(),
  last_name: string(),
  ...contact,
  ...address,
  return_street: string(),
  return_number: number(),
  return_complement: string()
    .nullable()
    .notRequired(),
  return_commune_id: yup
    .number()
    .min('1', 'Campo requerido')
    .required('Campo requerido')
});

export default addressesesValidation;
