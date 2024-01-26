import * as yup from 'yup';
import { number, string, email } from '../index';

// eslint-disable-next-line import/prefer-default-export
const signupValidation = yup.object().shape({
  company_name: string(),
  first_name: string(),
  last_name: string(),
  phone: yup
    .number('Sólo se permiten números')
    .required('Campo requerido')
    .nullable(),
  email: email().required('El correo es requerido'),
  password: string().min(6, 'Mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .required('Campo requerido')
    .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  commune_id: number().min('1', 'Campo requerido'),
  company_description: number().min('1', 'Campo requerido'),
  quantity: number().min('1', 'Campo requerido'),
  how_to_know_shipit: yup.object().shape({
    how_to_know: number().min('1', 'Campo requerido'),
    from: yup.string().when('how_to_know', {
      is: 11,
      then: field => field.required('Campo Requerido')
    })
  })
});

export default signupValidation;
