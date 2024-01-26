import React, { memo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'antd';
import { withFormik } from 'formik';
import { Form, Checkbox } from 'formik-antd';

import UserWrapper from './UserWrapper';
import { Email, FormInput } from '~/src/components/library/FormikFormComponents';
import loginValidation from '~/src/utils/formValidations/loginValidation';
import { withUser } from './containers/UserContainer';

const Login = ({ loading }) => (
  <>
    <Head>
      <title>Iniciar Sesión</title>
      <link href="static/printer_animation/printer.css" rel="stylesheet" key="printer" />
    </Head>
    <UserWrapper registerLink={false}>
      {isLoading => (
        <>
          <Form layout="vertical">
            <Email />
            <FormInput type="password" name="password" placeholder="Contraseña" />
            <Button
              style={{ marginTop: '10px' }}
              disabled={isLoading}
              loading={loading || isLoading}
              data-testid="login"
              type="primary"
              htmlType="submit"
              block
            >
              Iniciar Sesión
            </Button>
            <Form.Item name="remember" style={{ marginTop: '15px', paddingBottom: '0px' }}>
              <Checkbox name="remember">Mantener sesión conectada</Checkbox>
            </Form.Item>
            <Link href="/recovery">
              <a>¿Olvidaste tu contraseña?</a>
            </Link>
          </Form>
        </>
      )}
    </UserWrapper>
  </>
);

export default withUser(
  withFormik({
    mapPropsToValues: () => ({ email: '', password: '', remember: true }),
    validationSchema: loginValidation,
    handleSubmit: (values, { props: { login } }) => {
      login(values);
    }
  })(memo(Login))
);
