import * as yup from 'yup';
import { email } from './index';

const ccEmailValidation = yup.object().shape({
  ccEmail: email()
});

export default ccEmailValidation;
