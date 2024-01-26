import { memo } from 'react';
import { Row, Typography } from 'antd';

const { Paragraph, Text } = Typography;

const Footer = ({ backroundColor, fontColor }) => {
  return (
    <div>
      <Row
        style={{
          backgroundColor: '#808080',
          width: '100%',
          marginBottom: '20px',
          padding: '20px'
        }}
        type="flex"
        align="middle"
      >
        <Paragraph style={{ color: 'white' }}>
          <Text strong style={{ color: 'white' }}>
            Recuerda que
          </Text>{' '}
          el tiempo de entrega depende de la distancia
          <Text strong style={{ color: 'white' }}>
            {' '}
            entre el lugar de origen y el lugar de destino.
          </Text>
        </Paragraph>
      </Row>
      <Row
        style={{
          color: fontColor,
          backgroundColor: backroundColor,
          width: '100%',
          padding: '30px',
          textAlign: 'center'
        }}
      >
        <Row style={{ marginBottom: '10px' }}>
          Por parte de Shipit te damos las gracias por preferir nuestro servicio
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          Enviado por www.shipit.cl - Tecnología y logística para tu eCommerce
        </Row>
        <Row style={{ marginBottom: '10px' }}>Shipit © 2019. Todos los derechos reservados.</Row>
      </Row>
    </div>
  );
};

export default memo(Footer);
