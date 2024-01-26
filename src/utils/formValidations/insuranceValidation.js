import * as yup from 'yup';

const insuranceValidation = yup.object().shape({
  shipmentForm: yup.object().shape({
    insurance: yup.object().shape({
      extra: yup.boolean(),
      ticket_amount: yup
        .number('Campo requerido')
        .typeError('Campo requerido')
        .nullable()
        .when('extra', {
          is: true,
          then: field =>
            field
              .required('Campo requerido')
              .moreThan(70000, 'El valor a declarar debe ser mayor a $70.000')
              .lessThan(1000001, 'El valor a declarar debe ser menor o igual a $1.000.000')
        }),
      detail: yup
        .string('Campo requerido')
        .nullable()
        .when('extra', {
          is: true,
          then: field => field.required('Campo requerido')
        }),
      ticket_number: yup
        .string('Campo requerido')
        .nullable()
        .when('extra', {
          is: true,
          then: field => field.required('Campo requerido')
        })
    }),
    courier: yup.object().shape({
      algorithm_days: yup
        .number('Campo requerido')
        .nullable()
        .moreThan(1, 'El número mínimo de días debe ser mayor a 2')
        .when('algorithm', {
          is: 2,
          then: field => field.required('Campo requerido')
        })
    })
  })
});

export default insuranceValidation;
