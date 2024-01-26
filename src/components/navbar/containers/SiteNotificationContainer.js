import { connect } from 'react-redux';
import * as actions from '~/src/actions/siteNotifications';
import { updateDebtorStatus } from '~/src/actions/app';

const Container = props => {
  return props.children({ ...props });
};

const mapStateToProps = ({
  siteNotifications,
  app: {
    company: { name }
  }
}) => {
  return { ...siteNotifications, name };
};

const mapDispatchToProps = { ...actions, updateDebtorStatus };

export const withSiteNotification = connect(mapStateToProps, mapDispatchToProps);

export const SiteNotificationContainer = connect(mapStateToProps, mapDispatchToProps)(Container);
