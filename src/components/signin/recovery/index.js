import { memo } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withUser } from '../containers/UserContainer';
import SendCode from './SendCode';
import EnterCode from './EnterCode';
import PasswordReset from './PasswordReset';
import UserWrapper from '../UserWrapper';

const Recovery = ({ verificationCode, isCodeVerified }) => {
  const renderSwitch = () => {
    if (!verificationCode && !isCodeVerified) {
      return <SendCode />;
    }
    if (verificationCode && !isCodeVerified) {
      return <EnterCode />;
    }
    return <PasswordReset />;
  };

  return (
    <>
      <Head>
        <title>Recupera tu contraseña</title>
        <link href="static/printer_animation/printer.css" rel="stylesheet" key="printer" />
      </Head>
      <UserWrapper title="Recuperar Contraseña" registerLink={false}>
        <>
          {renderSwitch()}
          <Link href="/login">
            <a>Iniciar Sesión</a>
          </Link>
        </>
      </UserWrapper>
    </>
  );
};

export default withUser(memo(Recovery));
