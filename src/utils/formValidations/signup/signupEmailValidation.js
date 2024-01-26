import * as yup from 'yup';
import { string } from '../index';

// eslint-disable-next-line import/prefer-default-export
const signupEmailValidation = yup.object().shape({
  password: string().min(6, 'Mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .required('Campo requerido')
    .oneOf([yup.ref('password'), null], 'Contraseñas deben coincidir')
});

export default signupEmailValidation;
