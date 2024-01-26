import AccountAuthForm from './formComponents/AccountAuthForm';
import Email from './formComponents/Email';
import FormCheckbox from './formComponents/FormCheckbox';
import FormInput from './formComponents/FormInput';
import FormSelect from './formComponents/FormSelect';
import Phone from './formComponents/Phone';
import Street from './formComponents/Street';
import SwitchInput from './formComponents/SwitchInput';

const Contact = ({ disabled = false }) => (
  <>
    <Email disabled={disabled} />
    <Phone disabled={disabled} />
  </>
);

export {
  AccountAuthForm,
  Contact,
  Email,
  FormCheckbox,
  FormInput,
  FormSelect,
  Phone,
  Street,
  SwitchInput
};
