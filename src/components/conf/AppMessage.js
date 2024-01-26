import { Alert } from 'antd';
import moment from 'moment';

const AppMessage = () => {
  const handleClose = () => {
    const timestamp = moment().unix();
    window.localStorage.setItem('appMessage', timestamp);
  };

  const showMessage = () => {
    const time = window.localStorage.getItem('appMessage');
    if (!time) return true;

    const timestamp = parseInt(time, 10);

    const timeA = moment.unix(parseInt(timestamp, 10));
    const timeB = moment();

    const diff = timeB.diff(timeA, 'hours');

    return diff > 5;
  };

  const description = () => (
    <div>
      El cierre de entregas en mucha comunas al sur de Chile durante el paro de camioneros ha
      generado una acumulación de envíos pendientes y muchas comunas todavía se encuentran cerradas,
      así que no podrás generar tracking o imprimir etiquetas. Te aconsejamos aún no cargar nuevos
      pedidos hacia esas zonas hasta que la situación se estabilice.{' '}
      <a
        onClick={() => {
          window.open('https://shipitcl.zendesk.com/hc/es-419/articles/360053023954');
        }}
        href="#"
      >
        Revisa el detalle aquí
      </a>
      .
    </div>
  );

  return (
    <>
      {showMessage() ? (
        <Alert
          banner
          style={{ margin: '20px' }}
          message="Atención"
          description={description()}
          type="warning"
          showIcon
          closable
          onClose={handleClose}
        />
      ) : null}
    </>
  );
};

export default AppMessage;
