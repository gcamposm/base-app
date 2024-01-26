import { SHOW_MODAL, HIDE_MODAL } from '../actions/actionTypes';

const initialState = {
  modalType: null,
  modalProps: {}
};

function modal(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return { ...state, modalType: null };
    default:
      return { ...state };
  }
}

export default modal;
