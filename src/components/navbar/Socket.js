import { memo, useState, useEffect } from 'react';
import io from 'socket.io-client';

import { getAuthInfo } from '~/src/utils/auth';
import { socketUrl } from '~/src/utils/api';

const {
  company: { id: companyId }
} = getAuthInfo();

const Socket = ({ setDownload, setNotification, setAppMessage }) => {
  const [socket] = useState(
    io(socketUrl, { autoConnect: false, transports: ['websocket', 'polling'] })
  );

  const cleanConnection = () => {
    socket.off();
    socket.emit('close', { company_id: companyId });
    socket.close();
  };

  const openConnection = callback => {
    socket.open();
    socket.emit('open', { company_id: companyId });
    if (typeof callback === 'function') {
      callback();
    }
  };

  const handleDownload = response => {
    if (typeof response === 'object') {
      setDownload(response);
    }
  };

  const handleMessage = response => {
    if (typeof response === 'object') {
      setNotification(response);
    }
  };

  const handleAppMessage = response => {
    if (typeof response === 'object') {
      setAppMessage(response);
    }
  };

  const socketEvents = () => {
    socket.on(`download_${companyId}`, handleDownload);
    socket.on(`message_${companyId}`, handleMessage);
    socket.on('app_message', handleAppMessage);
  };

  useEffect(() => {
    openConnection(socketEvents);
    return cleanConnection;
  }, []);

  return <div />;
};

const compare = () => {
  return true;
};

export default memo(Socket, compare);
