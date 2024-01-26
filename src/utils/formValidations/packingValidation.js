import * as yup from 'yup';
import { string, number } from './index';
import { floatNumberValidation } from '~/src/utils/constants';

const packingValidation = yup.object().shape({
  packing: yup.object().shape({
    name: string(),
    sizes: yup.object().shape({
      width: number()
        .min(1, 'Valor incorrecto')
        .nullable()
        .typeError('Campo requerido'),
      height: number()
        .min(1, 'Valor incorrecto')
        .nullable()
        .typeError('Campo requerido'),
      length: number()
        .min(1, 'Valor incorrecto')
        .nullable()
        .typeError('Campo requerido'),
      volumetric_weight: string().nullable()
    }),
    weight: yup
      .string()
      .transform(value => {
        if (floatNumberValidation.test(value)) {
          const data = parseFloat(value.includes(',') ? value.replace(/,/g, '.') : value);
          if (data >= 0.01) {
            return data.toString();
          }
        }
      })
      .required('Números desde 0,01 separados por . ó ,')
      .nullable()
  })
});

export default packingValidation;
