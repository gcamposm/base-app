import * as yup from 'yup';
import { string, number } from '../index';

const ticketValiation = yup.object().shape({
  subject: number().min('1', 'Campo requerido'),
  message: string(),
  package_reference: yup.string().when('subject', {
    is: value => {
      return [4, 5].includes(value);
    },
    then: field => field.required('Campo requerido'),
    otherwise: field => field
  }),
  package_tracking: yup.string(),
  other_subject: number().min('1', 'Campo requerido')
});

export default ticketValiation;
