import * as yup from 'yup';
import { string, email, rut } from './index';

const administrativeValidation = yup.object().shape({
  website: yup.string(),
  run: rut(),
  name: string(),
  business_name: string(),
  business_turn: string(),
  bill_address: string(),
  bill_phone: string(),
  bill_email: email().required('El correo es requerido')
});

export default administrativeValidation;
