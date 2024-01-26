import * as yup from 'yup';
import { string } from './index';
import contact from './partials/contact';

const modalDispatchValidation = yup.object().shape({
  courier_for_client: yup.string().required('Campo requerido'),
  origin_name: yup.string().required('Campo requerido'),
  full_name: string().required('Campo requerido'),
  ...contact,
  street: yup.string().required('Campo requerido'),
  number: yup.string().required('Campo requerido'),
  commune_id: yup
    .number()
    .required('Campo requerido')
    .min(1, 'Campo requerido'),
  complement: yup.string().nullable()
});
export default modalDispatchValidation;
