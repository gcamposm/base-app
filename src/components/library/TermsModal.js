import { useState } from 'react';
import { Modal, Row, Checkbox, Button } from 'antd';

const TermsModal = ({ visibility, setVisibility }) => {
  const [checkBoxState, setCheckBoxState] = useState(false);

  const handleScroll = e => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setCheckBoxState(true);
    }
  };

  return (
    <Modal
      title="Términos y Condiciones"
      style={{ top: '10%' }}
      width={800}
      visible={visibility}
      closable={false}
      footer={[
        <Button
          key="1"
          disabled={!checkBoxState}
          type="primary"
          onClick={() => {
            setVisibility(false);
          }}
        >
          Aceptar
        </Button>
      ]}
    >
      <Row>
        <div
          onScroll={handleScroll}
          style={{
            overflowY: 'scroll',
            height: '300px',
            width: '100%',
            border: '1px solid grey',
            padding: '10px',
            maring: '0 auto'
          }}
        >
          <h3>Términos y condiciones</h3>
          <ol>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident veniam quibusdam
                natus architecto blanditiis eum ipsam quos corporis! Laborum facere sed in sunt
                officiis, voluptas quaerat ullam non accusantium ducimus?
              </p>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam modi
                dolores officia unde odit rem? Non ab eos cumque placeat, quaerat labore atque
                voluptatem corporis laboriosam quisquam in quia.
              </p>
            </li>
            <li>
              {' '}
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam modi
                dolores officia unde odit rem? Non ab eos cumque placeat, quaerat labore atque
                voluptatem corporis laboriosam quisquam in quia.
              </p>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam modi
                dolores officia unde odit rem? Non ab eos cumque placeat, quaerat labore atque
                voluptatem corporis laboriosam quisquam in quia.
              </p>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam modi
                dolores officia unde odit rem? Non ab eos cumque placeat, quaerat labore atque
                voluptatem corporis laboriosam quisquam in quia.
              </p>
            </li>
          </ol>
        </div>
      </Row>
      <Row type="flex" justify="start" style={{ marginTop: '10px' }}>
        <div>Acepto los términos y las condiciones del servicio:</div>
        <div style={{ marginLeft: '5px' }}>
          <Checkbox
            checked={checkBoxState}
            onChange={e => {
              setCheckBoxState(!checkBoxState);
            }}
          />
        </div>
      </Row>
    </Modal>
  );
};

export default TermsModal;
