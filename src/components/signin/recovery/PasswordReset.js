import { Button } from 'antd';
import Router from 'next/router';
import { withFormik } from 'formik';
import { Form } from 'formik-antd';
import { FormInput } from '~/src/components/library/FormikFormComponents';
import signupEmailValidation from '~/src/utils/formValidations/signup/signupEmailValidation';
import { withUser } from '../containers/UserContainer';

const PasswordReset = ({ loading }) => {
  return (
    <Form>
      <FormInput name="password" type="password" placeholder="Contraseña Nueva" />
      <FormInput
        name="password_confirmation"
        type="password"
        placeholder="Repita Contraseña Nueva"
      />
      <Button
        style={{ marginTop: '10px', marginBottom: '10px' }}
        type="primary"
        htmlType="submit"
        block
        loading={loading}
      >
        Resetear Contraseña
      </Button>
    </Form>
  );
};

export default withUser(
  withFormik({
    mapPropsToValues: () => ({ password: '', password_confirmation: '' }),
    validationSchema: signupEmailValidation,
    handleSubmit: (values, { props: { passwordReset } }) => {
      passwordReset(values.password, values.password_confirmation, () => {
        Router.push('/login');
      });
    }
  })(PasswordReset)
);
