import { Modal, Popconfirm, Button } from 'antd';

const ReusableModal = ({
  okText = 'Guardar',
  cancelText = 'Cancelar',
  clearAction,
  buttonLoading,
  onSave,
  children,
  width = 800,
  disabled = false,
  cancelType = 'danger',
  confirm = true,
  closable = false,
  deleteButtonAvailable = false,
  onDelete,
  ...restProps
}) => {
  return (
    <Modal
      okText={okText}
      cancelText={cancelText}
      closable={closable}
      visible
      style={{ top: '10%' }}
      width={width}
      onCancel={() => {
        clearAction();
      }}
      footer={[
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 'auto' }}>
            {deleteButtonAvailable ? (
              <Popconfirm
                data-testid="modal-delete"
                key="1"
                title="¿Seguro que quieres eliminar?"
                onConfirm={onDelete}
                cancelText="No"
                okText="Sí, eliminar"
              >
                <Button disabled={disabled} type="danger" key="5" loading={buttonLoading || false}>
                  Eliminar
                </Button>
              </Popconfirm>
            ) : null}
          </div>
          <>
            {confirm ? (
              <Popconfirm
                data-testid="modal-cancel"
                key="2"
                title={`¿Seguro que quieres ${cancelText.toLowerCase()}?`}
                onConfirm={clearAction}
                onCancel={() => {}}
                cancelText="No"
                okText={`Sí, ${cancelText.toLowerCase()}`}
              >
                <Button key="2" type={cancelType} style={{ justifyContent: 'right' }}>
                  {cancelText}
                </Button>
              </Popconfirm>
            ) : (
              <Button
                key="3"
                type={cancelType}
                onClick={clearAction}
                style={{ justifyContent: 'right' }}
              >
                {cancelText}
              </Button>
            )}
            <Button
              data-testid="modal-save"
              disabled={disabled}
              type="primary"
              key="4"
              loading={buttonLoading || false}
              onClick={() => {
                onSave();
              }}
            >
              {okText}
            </Button>
          </>
        </div>
      ]}
      {...restProps}
    >
      {children}
    </Modal>
  );
};

export default ReusableModal;
