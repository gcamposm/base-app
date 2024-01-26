import * as yup from 'yup';
import { string } from './index';
import address from './partials/address';
import contact from './partials/contact';

const originValidation = yup.object().shape({
  reference: string().max(15, 'No puede ser de más de 15 carácteres'),
  origin_id: yup.number(),
  full_name: string(),
  checkbox_alias_origin: yup.boolean(),
  name: yup.string().when('checkbox_alias_origin', {
    is: true,
    then: field => field.required('Campo requerido')
  }),
  ...contact,
  ...address
});

export default originValidation;
