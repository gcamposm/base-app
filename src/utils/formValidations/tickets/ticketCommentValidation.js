import * as yup from 'yup';
import { string } from '../index';

const ticketCommentValidation = yup.object().shape({
  message_to_submit: string()
});

export default ticketCommentValidation;
