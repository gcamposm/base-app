/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable react/no-danger */
/* eslint-disable camelcase */
import { memo, useEffect, useState } from 'react';
import { Card, Row, Input, Skeleton } from 'antd';
import Icon from '@ant-design/icons';
import { FaWhatsapp } from 'react-icons/fa';

import { withNotifications } from '../containers/NotificationsContainer';

const { TextArea } = Input;

const WhatsappPreview = ({ setWhatsappProps, whatsappProps: { one } }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    if (one) {
      setText(parseContent(one));
    }
  }, [one]);

  function is_aplhanumeric(c) {
    const x = c.charCodeAt();
    return (x >= 65 && x <= 90) || (x >= 97 && x <= 122) || (x >= 48 && x <= 57) ? true : false;
  }

  function whatsappStyles(format, wildcard, opTag, clTag) {
    const indices = [];
    for (let i = 0; i < format.length; i++) {
      if (format[i] === wildcard) {
        if (indices.length % 2)
          format[i - 1] == ' '
            ? null
            : typeof format[i + 1] == 'undefined'
            ? indices.push(i)
            : is_aplhanumeric(format[i + 1])
            ? null
            : indices.push(i);
        else
          typeof format[i + 1] == 'undefined'
            ? null
            : format[i + 1] == ' '
            ? null
            : typeof format[i - 1] == 'undefined'
            ? indices.push(i)
            : is_aplhanumeric(format[i - 1])
            ? null
            : indices.push(i);
      } else {
        format[i].charCodeAt() == 10 && indices.length % 2 ? indices.pop() : null;
      }
    }
    indices.length % 2 ? indices.pop() : null;
    let e = 0;
    indices.forEach(function(v, i) {
      const t = i % 2 ? clTag : opTag;
      v += e;
      format = format.substr(0, v) + t + format.substr(v + 1);
      e += t.length - 1;
    });
    return format;
  }

  const parseContent = text => {
    let format = whatsappStyles(text, '_', '<i>', '</i>');
    format = whatsappStyles(format, '*', '<b>', '</b>');
    format = whatsappStyles(format, '~', '<s>', '</s>');
    format = format.replace(/\n/gi, '<br>');
    return format;
  };

  return (
    <Card>
      <div style={{ padding: '0 0' }}>
        <Row>
          <div
            style={{
              background: '#1dbda5',
              color: 'white',
              width: '100%',
              textAlign: 'center',
              padding: '10px'
            }}
          >
            <Icon component={FaWhatsapp} style={{ float: 'left', fontSize: '20px' }} />
            _Itálica_ | *Negrita* | ~Tachado~
          </div>
          {one ? (
            <TextArea
              style={{ marginBottom: '25px' }}
              value={one}
              autoSize
              onChange={({ target: { value: textContent } }) => {
                setWhatsappProps({ one: textContent });
              }}
            />
          ) : (
            <Skeleton active />
          )}
        </Row>
        <Row>
          <div
            style={{
              background: '#1dbda5',
              color: 'white',
              width: '100%',
              textAlign: 'center',
              padding: '10px'
            }}
          >
            Vista Previa
          </div>
          {text ? (
            <div
              style={{ border: '1px solid #0000002e', padding: '8px' }}
              dangerouslySetInnerHTML={{
                __html: text
              }}
            />
          ) : (
            <Skeleton active />
          )}
        </Row>
      </div>
    </Card>
  );
};

export default withNotifications(memo(WhatsappPreview));
