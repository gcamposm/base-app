import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import apiMiddleware from '~/src/middleware/apiMiddleware';
import * as actions from '../addresses';

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

const server = setupServer(
  // Provide request handlers
  rest.get('*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        firstName: 'John',
        lastName: 'Maverick'
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('addresses actions', () => {
  afterEach(() => {});

  // cant mock apiMiddleware succesfully

  it('should dispatch', async () => {
    const store = mockStore({ addresses: [] });

    store.dispatch(actions.requestAddresses());
  });
});
