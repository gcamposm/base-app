import * as yup from 'yup';
import { email } from './index';

const operativeValidation = yup.object().shape({
  email: email().required('El correo es requerido'),
  password: yup.string(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Contraseñas deben coincidir')
});

export default operativeValidation;
