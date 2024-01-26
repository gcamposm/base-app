import * as yup from 'yup';
import { string, rut } from '../index';
import contact from '../partials/contact';

const billingValidation = yup.object().shape({
  first_name: string(),
  last_name: string(),
  ...contact,
  bill_address: string(),
  run: rut(),
  business_name: string(),
  business_turn: string()
});

export default billingValidation;
