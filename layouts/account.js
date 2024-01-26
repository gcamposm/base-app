import Head from 'next/head';
import { Layout, Row, Col } from 'antd';
import styles from '../src/assets/account/layout.modules.less';

const { Content } = Layout;

const AccountPage = ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
      <meta charSet="utf-8" />
    </Head>
    <Layout className={styles.page_signin}>
      <Layout>
        <Content>
          <Row type="flex" style={{ alignItems: 'center' }}>
            <Col className={styles.form_box}>
              <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
                {children}
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  </div>
);

export default AccountPage;
