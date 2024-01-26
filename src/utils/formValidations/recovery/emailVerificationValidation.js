import * as yup from 'yup';
import { email } from '../index';

const emailVerificationValidation = yup.object().shape({
  email: email().required('Correo requerido')
});

export default emailVerificationValidation;
