/* eslint-disable camelcase */
import { memo } from 'react';
import dynamic from 'next/dynamic';

import { ModalContainer } from './ModalContainer';

const ModalCourierCredentials = dynamic(
  import('~/src/components/courierCredentials/modals/ModalCourierCredential'),
  { loading: () => false }
);

const MODAL_COMPONENTS = {
  COURIER_CREDENTIALS: ModalCourierCredentials
};

const ModalDisplayer = () => {
  return (
    <ModalContainer>
      {({ hideModal, modalProps, modalType }) => {
        if (!modalType) {
          return null;
        }

        const SpecificModal = MODAL_COMPONENTS[modalType];
        if (!SpecificModal) {
          console.warn('Modal load error');
          return null;
        }

        return <SpecificModal {...modalProps} hideModal={hideModal} />;
      }}
    </ModalContainer>
  );
};

export default memo(ModalDisplayer);
