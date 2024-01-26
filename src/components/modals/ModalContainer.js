import { connect } from 'react-redux';
import { hideModal } from '~/src/actions/modal';

const Container = props => {
  return props.children({ ...props });
};

const mapStateToProps = ({ modal }) => {
  return { ...modal };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  };
};

export const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export const withModal = connect(
  mapStateToProps,
  mapDispatchToProps
);
