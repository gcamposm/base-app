import * as yup from 'yup';
import { string } from '../index';

const codeValidation = ({ verificationCode }) => {
  return yup.object().shape({
    verification_code: string().matches(verificationCode, 'Códigos no coinciden')
  });
};

export default codeValidation;
