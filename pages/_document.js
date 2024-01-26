import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/static/favicon-shipit-admin.svg" />
        </Head>
        <body style={{ background: '#f0f2f5' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
