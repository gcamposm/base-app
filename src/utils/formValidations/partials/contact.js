import * as yup from 'yup';
import { email } from '../index';

const contact = {
  email: email(),
  phone: yup
    .number('Sólo se permiten números')
    .nullable(true)
    .cast(null)
};

export default contact;
