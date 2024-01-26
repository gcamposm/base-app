import * as yup from 'yup';
import { string } from './index';

const deactivateValidation = yup.object().shape({
  reason: string().required('Selecciona una opción'),
  other_reason: string().when('reason', {
    is: 'Otro motivo',
    then: field => field.required('Por favor, indica el motivo por el que desactivas tu cuenta.'),
    otherwise: field => field.required(false)
  }),
  details: string().required('Por favor, déjanos tus comentarios.'),
  confirmation: string()
    .required('El texto ingresado no coincide.')
    .matches(
      /(?:^|\W)DESACTIVAR(?:$|\W)/,
      'El texto ingresado no coincide, verifica las mayúsculas.'
    )
});

export default deactivateValidation;
