import * as yup from 'yup';
import { string, bool } from './index';

const subStatusValidation = yup.object().shape({
  id: yup.number(),
  name: string(),
  short_name: string(),
  symbol: string(),
  translation: string(),
  generic_status: yup.number().required('Campo requerido').min(0, 'Debe ser 0 o mayor').max(99, 'Debe ingresar un estado menor'),
  description: string(),
  color: string(),
  story: string(),
  show_story: bool(),
  courier_required: bool()
});

export default subStatusValidation;
