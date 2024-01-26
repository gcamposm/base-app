/* eslint-disable import/no-cycle */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import axios from 'axios';
import { redirectTo } from './helpers';

const secretToken =
  '53149ab8fbe1f0e92bbedf2efaa1da55c263d88c8f84a0c46e3406963086e9d797665369087fbf117fc346c3ac8982a825405721556f659d88911c7a1ec79368';

const notProtectedPaths = ['/login', '/recovery', '/_error', '/signin', '/mfa'];

const decodeToken = token => {
  try {
    return jwt.verify(token, secretToken);
  } catch (error) {
    return false;
  }
};

export const getAuthInfo = (ctx = {}) => {
  const cookies = parseCookies(ctx);
  return decodeToken(cookies.ets3);
};

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const destroySession = () => {
  destroyCookie({}, 'ets3');
  axios
    .post('/clearCookie', {}, { withCredentials: true })
    .then(() => {
      destroyCookie({}, 'ets3');
      Router.push('/login');
    })
    .catch(() => {});
};

export const notProtectedPathNames = currentPath => {
  return !notProtectedPaths.includes(currentPath);
};

export const setAuth = async (data, form = {}, callback) => {
  const EncodedToken = jwt.sign(data, secretToken);

  const options = { path: '/' };
  if (form.remember) {
    options.maxAge = 60 * 60 * 24 * 3;
  }

  setCookie({}, 'ets3', EncodedToken, options);
  if (typeof callback === 'function') {
    callback();
  }
};

export const redirectIfNoAdminShipit = (ctx, company = {}) => {
  if (ctx.pathname.includes('hack')) {
    if (company.id !== 1) {
      redirectTo('/courier_credentials', ctx);
    }
  }
};

export const redirectIfNoAuth = ctx => {
  if (ctx) {
    const { pathname } = ctx;
  
    const isAuth = getAuthInfo(ctx);
  
    if (!notProtectedPaths.includes(pathname) && !isAuth) {
      redirectTo('/login', ctx);
      return;
    }
  
    if ((notProtectedPaths.includes(pathname) || pathname === '/') && isAuth) {
      redirectTo('/courier_credentials', ctx);
      return;
    }
  } else {
    redirectTo('/login', ctx);
    return;
  }
};

export const rebuildSession = user => {
  destroyCookie({}, 'ets3');
  setAuth(user);
  Router.push('/courier_credentials');
};

export const updateAuthSetup = (setup_flow, callback) => {
  const auth = getAuthInfo();
  auth.company.setup_flow = setup_flow;
  setAuth(auth, {}, callback);
};
