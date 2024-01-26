import { Button } from 'antd';
import { withFormik } from 'formik';
import { Form } from 'formik-antd';
import { FormInput } from '~/src/components/library/FormikFormComponents';
import codeValidation from '~/src/utils/formValidations/recovery/codeValidation';
import { withUser } from '../containers/UserContainer';

const EnterCode = ({ loading }) => {
  return (
    <Form>
      <FormInput name="verification_code" />
      <Button
        style={{ marginTop: '10px', marginBottom: '10px' }}
        type="primary"
        htmlType="submit"
        block
        loading={loading}
      >
        Verificar Código de Reseteo
      </Button>
    </Form>
  );
};

export default withUser(
  withFormik({
    mapPropsToValues: () => ({ verification_code: '' }),
    validationSchema: codeValidation,
    handleSubmit: (values, { props: { validateCode } }) => {
      validateCode();
    }
  })(EnterCode)
);
