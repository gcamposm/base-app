import {
  XLS,
  CLEAN_XLS_DATA,
  DELETE,
  ORDER,
  READ,
  UPDATE,
  SKUS,
  IMPORTING_FILE
} from '../actions/actionTypes';

const initialState = {
  data: [],
  loaded_skus: {},
  loading: false,
  validating: false
};

function xls(state = initialState, action) {
  switch (action.type) {
    case IMPORTING_FILE:
      return { ...state, loading: action.payload };
    case `${READ} ${XLS}`:
      return { ...state, data: action.payload, loading: false };
    case CLEAN_XLS_DATA:
      return { ...state, data: [], loaded_skus: [], loading: false };
    case `${DELETE} ${ORDER}`:
      return { ...state, data: state.data.filter(x => x.key !== action.payload) };
    case `${UPDATE} ${ORDER}`:
      return {
        ...state,
        loading: true,
        data: state.data.map(x => (x.key === action.payload.key ? action.payload : x))
      };
    case `${UPDATE} ${SKUS}`:
      return { ...state, loaded_skus: { ...state.loaded_skus, ...action.payload } };
    case `${DELETE} ${SKUS}`:
      return {
        ...state,
        loading: true,
        loaded_skus: Object.keys(state.loaded_skus).reduce((current, key) => {
          if (key != action.payload) {
            return { ...current, [key]: state.loaded_skus[key] };
          }
          return current;
        }, {})
      };
    default:
      return { ...state };
  }
}

export default xls;
