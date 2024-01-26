// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import apiMiddleware from '~src/middleware/apiMiddleware';
import notificationsMiddleware from '~src/middleware/notificationsMiddleware';
import reducers from '~/src/reducers/index';

// eslint-disable-next-line import/prefer-default-export
export const renderWithRedux = (
  ui,
  {
    initialState,
    store = createStore(
      reducers,
      initialState,
      applyMiddleware(thunk, notificationsMiddleware, apiMiddleware)
    )
  } = {}
) => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
};
