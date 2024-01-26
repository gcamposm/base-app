import React from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import App from 'next/app';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import withRedux from 'next-redux-wrapper';
import NProgress from 'nprogress';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale-provider/es_ES';

import numbro from 'numbro';
import chile from 'numbro/languages/es-CL';

import { redirectIfNoAuth } from '~/src/utils/auth';

import makeStore from '../src/store';
import MainPage from '../layouts/main';

import '~/static/nprogress.css';
import '~/static/antd-custom.css';
import { GOOGLE_TM_ID } from '../src/lib/googleTagManager';

const CacheVersion = dynamic(import('~/src/components/conf/CacheVersion'), { ssr: false });
const GoogleTagManager = dynamic(() => import('~/src/components/conf/GoogleTagManager'), {
  ssr: false
});
const BugsnagNotification = dynamic(import('~/src/components/conf/BugsnagNotification'), {
  ssr: false
});

numbro.registerLanguage(chile);
numbro.setLanguage('es-CL');

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
class StaffAdmin extends App {
  static async getInitialProps({ Component, ctx }) {
    // get the store to get user data
    // const { store } = ctx;
    // const { user } = store.getState();
    // const info = getAuthInfo(ctx);

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    // here add role redirect
    // redirectIfNoAdminShipit(ctx, info.user);
    redirectIfNoAuth(ctx);
    return {
      pageProps
    };
  }

  render() {
    const {
      Component,
      pageProps,
      store,
      router: { pathname }
    } = this.props;
    return (
      <>
        <Head>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TM_ID}`} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GOOGLE_TM_ID}', { page_path: window.location.pathname });
            `
            }}
          />
        </Head>
        <Provider store={store}>
          {['/login', '/recovery', '/_error'].includes(pathname) ? (
            <Component {...pageProps} />
          ) : (
            <BugsnagNotification>
              <MainPage>
                <ConfigProvider locale={locale}>
                  <Component {...pageProps} />
                </ConfigProvider>
                <CacheVersion />
              </MainPage>
            </BugsnagNotification>
          )}
        </Provider>
        <GoogleTagManager />
      </>
    );
  }
}

export default withRedux(makeStore)(withRouter(StaffAdmin));
