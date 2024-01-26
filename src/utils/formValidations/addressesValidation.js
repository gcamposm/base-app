import * as yup from 'yup';
import { string } from './index';
import address from './partials/address';
import contact from './partials/contact';

const addressesValidation = yup.object().shape({
  alias: string(),
  name: string(),
  addressable_type: string(),
  ...contact,
  ...address
});

export default addressesValidation;
