import { Divider } from 'antd';
import { DeactivateAccount, SalesmanInfo, Credentials } from './MyAccountComponents';

const MyAccount = () => {
  return (
    <>
      <Credentials />
      <Divider />
      <SalesmanInfo />
      <Divider />
      <DeactivateAccount />
    </>
  );
};

export default MyAccount;
