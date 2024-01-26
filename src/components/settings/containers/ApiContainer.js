import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '~/src/actions/api';

const Container = ({ children, ...restProps }) => {
  useEffect(() => {
    const { requestApiConfiguration } = restProps;
    requestApiConfiguration();
  }, []);

  return children({ ...restProps });
};

const mapStateToProps = ({ api }) => {
  return { ...api };
};

export const ApiContainer = connect(mapStateToProps, actions)(Container);

export const withApi = connect(mapStateToProps, actions);
