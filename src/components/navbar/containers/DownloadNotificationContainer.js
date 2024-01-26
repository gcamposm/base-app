import { connect } from 'react-redux';
import * as actions from '~/src/actions/downloadNotifications';
import { updateDebtorStatus } from '~/src/actions/app';

const Container = props => {
  return props.children({ ...props });
};

const mapStateToProps = ({
  downloadNotifications,
  app: {
    company: { name }
  }
}) => {
  return { ...downloadNotifications, name };
};

const mapDispatchToProps = { ...actions, updateDebtorStatus };

export const DownloadNotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Container);
