import * as yup from 'yup';
import { string, number } from './index';

const PickandPackValidation = yup.object().shape({
  origin_id: number()
    .min(1, 'Valor incorrecto')
    .nullable()
    .typeError('Campo requerido'),
  provider: string().matches(/^(?!0$)/, 'Campo requerido'),
  cutting_hour: string().matches(/^(?!0$)/, 'Campo requerido'),
  pickup_hour: string().matches(/^(?!0$)/, 'Campo requerido'),
  seller: yup.string().when('provider', {
    is: value => value === 'shipit' || value === '0',
    then: field => field.required('Campo requerido').matches(/^(?!0$)/, 'Campo requerido')
  }),
  labels: yup.string().when('provider', {
    is: value => value === 'shipit' || value === '0',
    then: field => field.required('Campo requerido').matches(/^(?!0$)/, 'Campo requerido')
  })
});

export default PickandPackValidation;
