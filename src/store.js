import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import getConfig from 'next/config';
import reducers from './reducers';
import apiMiddleware from './middleware/apiMiddleware';
import notificationsMiddleware from './middleware/notificationsMiddleware';
import performanceMiddleware from './middleware/performanceMiddleware';

let dev = null;
if (getConfig()) {
  dev = getConfig().publicRuntimeConfig.NODE_ENV;
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;
 */
const coreMiddlewares = [apiMiddleware, notificationsMiddleware];

const devMiddlewares = dev === 'development' ? [performanceMiddleware] : [];

const makeStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk, ...coreMiddlewares, ...devMiddlewares))
  );
};

export default makeStore;
