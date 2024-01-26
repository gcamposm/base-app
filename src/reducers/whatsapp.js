import {
  WHATSAPP_NOTIFICATION,
  WHATSAPP_STATE,
  SET_WHATSAPP_PROPS,
  READ,
  UPDATE,
  API_FAILURE,
  API_PENDING,
  API_SUCCESS,
  CREATE,
  SET_WHATSAPP_TAB,
  CLEAR_WHATSAPP_TAB
} from '../actions/actionTypes';

const whatsappProps = {
  id: 1,
  subject: '',
  one: null,
  text_one: '',
  tags: {
    buyer_name: '',
    tracking_number: '',
    package_reference: '',
    package_courier: ''
  }
};

const whatsappStates = {
  notification: {
    buyer: {
      whatsapp: {
        state: {
          in_preparation: {
            active: false
          },
          in_route: {
            active: false
          },
          by_retired: {
            active: false
          },
          delivered: {
            active: false
          },
          failed: {
            active: false
          }
        }
      }
    }
  }
};

const initialState = {
  whatsappTabKey: null,
  whatsappStates,
  loading: false,
  whatsappProps
};

function whatsappNotifications(state = initialState, action) {
  switch (action.type) {
    case `${WHATSAPP_NOTIFICATION} ${READ} ${API_PENDING}`:
    case `${WHATSAPP_NOTIFICATION} ${UPDATE} ${API_PENDING}`:
    case `${WHATSAPP_STATE} ${READ} ${API_PENDING}`:
    case `${WHATSAPP_STATE} ${UPDATE} ${API_PENDING}`:
    case `${WHATSAPP_NOTIFICATION} ${CREATE} ${API_PENDING}`:
      return {
        ...state,
        loading: true
      };
    case `${WHATSAPP_NOTIFICATION} ${READ} ${API_SUCCESS}`:
    case `${WHATSAPP_NOTIFICATION} ${UPDATE} ${API_SUCCESS}`:
      return {
        ...state,
        whatsappStates: action.payload,
        loading: false
      };
    case `${WHATSAPP_STATE} ${READ} ${API_SUCCESS}`:
      return {
        ...state,
        whatsappProps: {
          ...action.payload.text,
          tags: { ...action.payload.tags }
        },
        loading: false
      };
    case `${WHATSAPP_STATE} ${UPDATE} ${API_SUCCESS}`:
    case `${WHATSAPP_NOTIFICATION} ${CREATE} ${API_SUCCESS}`:
      return {
        ...state,
        loading: false
      };
    case SET_WHATSAPP_PROPS:
      return {
        ...state,
        whatsappProps: { ...state.whatsappProps, ...action.payload }
      };
    case SET_WHATSAPP_TAB:
      return {
        ...state,
        whatsappTabKey: 2
      };
    case CLEAR_WHATSAPP_TAB:
      return {
        ...state,
        whatsappTabKey: null
      };
    case `${WHATSAPP_NOTIFICATION} ${READ} ${API_FAILURE}`:
    case `${WHATSAPP_NOTIFICATION} ${UPDATE} ${API_FAILURE}`:
    case `${WHATSAPP_STATE} ${READ} ${API_FAILURE}`:
    case `${WHATSAPP_STATE} ${UPDATE} ${API_FAILURE}`:
    case `${WHATSAPP_NOTIFICATION} ${CREATE} ${API_FAILURE}`:
      return {
        ...state,
        loading: false
      };
    default:
      return { ...state };
  }
}

export default whatsappNotifications;
