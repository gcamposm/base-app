import Head from 'next/head';
import CourierCredentials from '~/src/components/courierCredentials/CourierCredentials';

const CourierCredentialsPage = () => (
  <>
    <Head>
      <title>Credenciales de couriers</title>
    </Head>
    <CourierCredentials />
  </>
);

export default CourierCredentialsPage;
