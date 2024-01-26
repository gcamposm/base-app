import * as yup from 'yup';
import { string, number } from '../index';

const address = {
  street: string(),
  number: number().typeError('Valor erróneo'),
  complement: string()
    .nullable()
    .notRequired(),
  commune_id: yup
    .number()
    .min('1', 'Campo requerido')
    .required('Campo requerido')
};

export default address;
