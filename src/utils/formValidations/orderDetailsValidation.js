import * as yup from 'yup';
import { floatNumberValidation } from '~/src/utils/constants';
import { number } from './index';

const orderDetailsValidation = yup.object().shape({
  width: number('Tamaño inválido')
    .positive('Tamaño inválido')
    .nullable(false),
  height: number('Tamaño inválido')
    .positive('Tamaño inválido')
    .nullable(false),
  length: number('Tamaño inválido')
    .positive('Tamaño inválido')
    .nullable(false),
  volumetric_weight: number(),
  check_box_save: yup.boolean(),
  sizes_name: yup.string().when('check_box_save', {
    is: true,
    then: field => field.required('Campo requerido')
  }),
  weight: yup
    .string()
    .transform((value, originalValue) => {
      if (floatNumberValidation.test(value)) {
        let data = parseFloat(value.includes(',') ? value.replace(/,/g, '.') : value);
        if (data >= 0.01) {
          return data.toString();
        }
      }
    })
    .required('Números desde 0,01 separados por . ó ,')
    .nullable(),
  items_count: number()
    .min(1, 'Valor incorrecto')
    .nullable()
    .typeError('Campo requerido')
  /* algorithm: number(),
  algorithm_days: yup.number('Campo requerido').when('algorithm', {
    is: 2,
    then: field => field.required('Campo requerido')
  }) */
});

orderDetailsValidation.typeError('Campo requerido');

export default orderDetailsValidation;
