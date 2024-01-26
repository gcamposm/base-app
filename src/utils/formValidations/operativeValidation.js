import * as yup from 'yup';
import { string, email } from './index';

const operativeValidation = yup.object().shape({
  /* email: email(),
  password: yup.string(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Contraseñas deben coincidir'), */
  first_name: string(),
  last_name: string(),
  phone: string(),
  contactEmail: yup.string().email('Email tiene que ser válido')
});

export default operativeValidation;
