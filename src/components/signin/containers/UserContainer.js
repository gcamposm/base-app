import { connect } from 'react-redux';
import * as actions from '../../../actions/user';

const Container = props => {
  return props.children({ ...props });
};

const mapStateToProps = ({ account }) => {
  return { ...account };
};

export const withUser = connect(
  mapStateToProps,
  actions
);

export const UserContainer = connect(
  mapStateToProps,
  actions
)(Container);
