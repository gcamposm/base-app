import Login from '../src/components/signin/Login';
import AccountPage from '../layouts/account';

const Sign = props => {
  return (
    <AccountPage {...props}>
      <Login />
    </AccountPage>
  );
};

Sign.getInitialProps = async () => { };

export default Sign;
