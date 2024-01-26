import * as yup from 'yup';
import { string } from './index';
import contact from './partials/contact';

const validation = {
  origin_id: yup.number(),
  full_name: string(),
  ...contact,
  destiny_id: yup.number(),
  checkbox_alias_destiny: yup.boolean(),
  name: yup.string().when('checkbox_alias_destiny', {
    is: true,
    then: field => field.required('Campo requerido')
  })
};

const destinationValidation = (deliveryRadio, platform) => {
  if (deliveryRadio === 2) {
    const courier_id = yup
      .number()
      .required('Campo requerido')
      .min(1, 'Campo requerido');

    return yup.object().shape({
      ...validation,
      courier_id: platform !== 'sheet' ? courier_id : yup.number(),
      courier_branch_office_id: yup
        .number()
        .required('Campo requerido')
        .min(0, 'Campo requerido')
    });
  }

  return yup.object().shape({
    ...validation,
    courier_id: yup.number().when('delivery_id', {
      is: value => (value === '2' ? '2' : false),
      then: field => field.positive('Campo requerido').required('Campo requerido')
    }),
    courier_branch_office_id: yup.number().when('delivery_id', {
      is: value => (value === '2' ? '2' : false),
      then: field => field.min(0, 'Campo requerido').required('Campo requerido')
    }),
    street: yup.string().when('delivery_id', {
      is: '1',
      then: field => field.required('Campo requerido')
    }),
    number: yup.string().when('delivery_id', {
      is: '1',
      then: field => field.required('Campo requerido')
    }),
    commune_id: yup.number('Campo incorrecto').when('delivery_id', {
      is: '1',
      then: field =>
        field
          .required('Campo requerido')
          .min(1, 'Campo requerido')
          .nullable()
    }),
    complement: yup
      .string()
      .nullable()
      .notRequired()
  });
};

export default destinationValidation;
