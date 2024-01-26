import * as yup from 'yup';
import { string, email } from './index';

const apiValidation = yup.object().shape({
  email: email().required('El correo es requerido'),
  token: string(),
  url: string()
});

export default apiValidation;
