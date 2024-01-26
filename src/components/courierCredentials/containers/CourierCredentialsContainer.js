import { connect } from 'react-redux';
import * as actions from '~/src/actions/courierCredentials';
import { showModal, hideModal } from '~/src/actions/modal';

const Container = props => {
  return props.children({ ...props });
};

const mapStateToProps = ({ courierCredentials }) => {
  return {
    ...courierCredentials
  };
};

const mapDispatchToProps = {
  ...actions,
  showModal,
  hideModal
};

export const CourierCredentialsContainer = connect(mapStateToProps, mapDispatchToProps)(Container);
export const withCourierCredentials = connect(mapStateToProps, mapDispatchToProps);
