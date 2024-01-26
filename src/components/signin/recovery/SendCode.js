import { Button } from 'antd';
import { withFormik } from 'formik';
import { Form } from 'formik-antd';
import { Email } from '~/src/components/library/FormikFormComponents';
import emailVerificationValidation from '~/src/utils/formValidations/recovery/emailVerificationValidation';
import { withUser } from '../containers/UserContainer';

const SendCode = ({ loading }) => {
  return (
    <Form>
      <Email />
      <Button
        style={{ marginTop: '10px', marginBottom: '10px' }}
        type="primary"
        htmlType="submit"
        block
        loading={loading}
      >
        Enviar Código de Reseteo
      </Button>
    </Form>
  );
};

export default withUser(
  withFormik({
    mapPropsToValues: () => ({ email: '' }),
    validationSchema: emailVerificationValidation,
    handleSubmit: (values, { props: { sendRecoveryCodeToEmail } }) => {
      sendRecoveryCodeToEmail(values.email);
    }
  })(SendCode)
);
