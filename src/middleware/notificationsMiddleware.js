import { notification } from 'antd';
import { API_SUCCESS, API_FAILURE } from '~/src/actions/actionTypes';

const notificationsMiddleware = () => next => action => {
  next(action);
  if (action.meta && action.meta.notifications) {
    const { successMessage, failureMessage } = action.meta.notifications;
    if (action.type.includes(API_SUCCESS) && successMessage) {
      if (typeof successMessage === 'object') {
        notification.success({ ...successMessage });
        return;
      }
      notification.success({ message: successMessage, duration: 3 });
    }
    if (action.type.includes(API_FAILURE) && failureMessage) {
      if (typeof successMessage === 'object') {
        notification.error({ ...failureMessage });
        return;
      }
      notification.error({ message: failureMessage, duration: 3 });
    }
  }
};

export default notificationsMiddleware;
