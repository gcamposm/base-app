import * as yup from 'yup';
import { string } from './index';
import address from './partials/address';
import contact from './partials/contact';

const originValidation = yup.object().shape({
  name: string(),
  surname: yup.string().when('checkbox_alias_origin', {
    is: true,
    then: field => field.required('Campo requerido'),
    otherwise: yup.string().min(0)
  }),
  ...contact,
  ...address
});

export default originValidation;
