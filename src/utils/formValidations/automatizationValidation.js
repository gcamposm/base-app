import * as yup from 'yup';
import { number } from '.';

const automatizationValidation = yup.object().shape({
  insurance: yup.object().shape({
    amount: number()
      .min(70001, 'El valor declarado debe superar los $70.000')
      .max(1000000, 'El valor declarado debe ser menor o igual a $1.000.000')
  })
});

export default automatizationValidation;
