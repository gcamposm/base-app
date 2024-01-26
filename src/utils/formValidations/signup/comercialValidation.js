import * as yup from 'yup';
import { string, number } from '../index';
import contact from '../partials/contact';

const contactValidation = yup.object().shape({
  first_name: string(),
  last_name: string(),
  ...contact,
  sellers: yup
    .array()
    .required('Campo requerido')
    .min(1)
    .nullable(),
  productTypes: yup
    .array()
    .required('Campo requerido')
    .min(1)
    .nullable()
});

export default contactValidation;
