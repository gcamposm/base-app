import * as yup from 'yup';
import { string, email } from './index';

const loginValidation = yup.object().shape({
  email: email().required('Correo requerido'),
  password: string()
});

export default loginValidation;
