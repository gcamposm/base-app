import { parseCookies, setCookie } from 'nookies';

export const getCollapsable = ctx => {
  const cookies = parseCookies(ctx);
  // return cookies.
};

export const setCollapsable = (ctx, value = false) => {
  setCookie(ctx, 'collapsable', value);
};
