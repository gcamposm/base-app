import * as yup from 'yup';
import { number, sizes } from './index';
// eslint-disable-next-line import/prefer-default-export
const quotationValidation = yup.object().shape({
  shipment: yup.object().shape({
    to_commune_id: number().min('1', 'Campo requerido'),
    width: sizes(),
    height: sizes(),
    length: sizes(),
    weight: sizes()
  })
});

export default quotationValidation;
