import { SHOW_MODAL, HIDE_MODAL } from './actionTypes';

export function showModal(modalType, modalProps) {
  return dispatch => {
    dispatch({
      type: SHOW_MODAL,
      modalType,
      modalProps
    });
  };
}

export function hideModal() {
  return dispatch => {
    dispatch({
      type: HIDE_MODAL
    });
  };
}
