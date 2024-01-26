import {
  CREATE,
  READ,
  READ_SINGLE,
  UPDATE,
  DELETE,
  ACTIVATE,
  DEACTIVATE,
  API_PENDING,
  API_FAILURE,
  API_SUCCESS,
  COURIER_CREDENTIALS,
  CLEAN_COURIER_CREDENTIAL,
  CLEAN_COURIER_CREDENTIAL_KEYS,
  ADD_COURIER_CREDENTIAL_KEY,
  DELETE_COURIER_CREDENTIAL_KEY,
  CREDENTIAL_KEYS,
  SET_WANT_ADD_BASE_KEY,
  SET_SHOW_COURIER_CREDENTIAL_KEYS,
  SET_COURIER_SERVICE_TYPE_ID,
  SET_COURIER_CREDENTIAL_KEY_ID,
  CLEAN_COURIER_CREDENTIAL_RULES,
  ADD_COURIER_CREDENTIAL_RULE,
  DELETE_COURIER_CREDENTIAL_RULE,
  HIDDE_COURIER_CREDENTIAL_TYPE
} from '../actions/actionTypes';
import {
  courierCredentialRuleTypeTranslations,
  courierCredentialRuleConditionTranslations
} from '~/src/utils/constants';

const initialState = {
  courierCredentials: [],
  courierCredential: null,
  courierCredentialsLoading: false,
  courierCredentialKeys: [],
  wantAddBaseKey: false,
  showCourierCredentialKeys: false,
  courierServiceTypeId: null,
  courierCredentialKeyId: null,
  courierCredentialRules: [],
  courierCredentialNames: [
    { translation: 'Company id', value: 'company_id', hidden: false },
    { translation: 'Origin id', value: 'origin_id', hidden: false }
  ]
};

const translateRules = rules => {
  const traslatedRules = [];
  rules.forEach(rule => {
    const traslatedRule = {
      name: rule.name,
      condition: rule.condition,
      value: rule.value,
      type_translation: courierCredentialRuleTypeTranslations[rule.name],
      condition_translation: courierCredentialRuleConditionTranslations[rule.condition]
    };
    traslatedRules.push(traslatedRule);
  });
  return traslatedRules;
};

const addKeyIndex = keys => {
  const indexedKeys = [];
  keys.forEach((key, i) => {
    const indexedKey = {
      key: key.key,
      value: key.value,
      id: i
    };
    indexedKeys.push(indexedKey);
  });
  return indexedKeys;
};

const findDeletedIndex = (courierCredentials, id) => {
  const ids = courierCredentials.map(courierCredential => courierCredential.id);
  const index = ids.indexOf(id);
  return index;
};

function courierCredentials(state = initialState, action) {
  switch (action.type) {
    case `${COURIER_CREDENTIALS} ${CREATE} ${API_PENDING}`:
    case `${COURIER_CREDENTIALS} ${READ} ${API_PENDING}`:
    case `${COURIER_CREDENTIALS} ${READ_SINGLE} ${API_PENDING}`:
    case `${COURIER_CREDENTIALS} ${UPDATE} ${API_PENDING}`:
    case `${COURIER_CREDENTIALS} ${DELETE} ${API_PENDING}`:
    case `${COURIER_CREDENTIALS} ${ACTIVATE} ${API_PENDING}`:
    case `${COURIER_CREDENTIALS} ${DEACTIVATE} ${API_PENDING}`:
    case `${CREDENTIAL_KEYS} ${CREATE} ${API_PENDING}`:
    case `${CREDENTIAL_KEYS} ${READ} ${API_PENDING}`:
      return {
        ...state,
        courierCredentialsLoading: true
      };
    case `${COURIER_CREDENTIALS} ${CREATE} ${API_FAILURE}`:
    case `${COURIER_CREDENTIALS} ${READ} ${API_FAILURE}`:
    case `${COURIER_CREDENTIALS} ${READ_SINGLE} ${API_FAILURE}`:
    case `${COURIER_CREDENTIALS} ${UPDATE} ${API_FAILURE}`:
    case `${COURIER_CREDENTIALS} ${DELETE} ${API_FAILURE}`:
    case `${COURIER_CREDENTIALS} ${ACTIVATE} ${API_FAILURE}`:
    case `${COURIER_CREDENTIALS} ${DEACTIVATE} ${API_FAILURE}`:
    case `${CREDENTIAL_KEYS} ${READ} ${API_FAILURE}`:
      return {
        ...state,
        courierCredentialsLoading: false
      };
    case `${CREDENTIAL_KEYS} ${CREATE} ${API_FAILURE}`:
      return {
        ...state,
        courierCredentialsLoading: false,
        courierCredentialKeys: initialState.courierCredentialKeys
      };
    case `${COURIER_CREDENTIALS} ${CREATE} ${API_SUCCESS}`:
      return {
        ...state,
        courierCredentials: [...state.courierCredentials, action.payload],
        courierCredentialsLoading: false
      };
    case `${COURIER_CREDENTIALS} ${READ} ${API_SUCCESS}`:
      return {
        ...state,
        courierCredentialsLoading: false,
        courierCredentials: action.payload.courier_credentials
      };
    case `${COURIER_CREDENTIALS} ${READ_SINGLE} ${API_SUCCESS}`:
      return {
        ...state,
        courierCredentialsLoading: false,
        courierCredential: action.payload.courier_credential,
        showCourierCredentialKeys: true,
        courierCredentialKeys: addKeyIndex(action.payload.courier_credential.keys),
        courierCredentialRules: translateRules(
          action.payload.courier_credential.courier_credential_rules
        )
      };
    case `${COURIER_CREDENTIALS} ${ACTIVATE} ${API_SUCCESS}`:
    case `${COURIER_CREDENTIALS} ${DEACTIVATE} ${API_SUCCESS}`: {
      const newCourierCredentials = [];
      const { id } = action.payload.courier_credential;
      state.courierCredentials.forEach(courierCredential => {
        const currentCourierCredential = courierCredential;
        if (courierCredential.id === id)
          currentCourierCredential.is_active = action.payload.courier_credential.is_active;
        newCourierCredentials.push(currentCourierCredential);
      });
      return {
        ...state,
        courierCredentialsLoading: false,
        courierCredentials: newCourierCredentials
      };
    }
    case `${COURIER_CREDENTIALS} ${UPDATE} ${API_SUCCESS}`: {
      const newCourierCredentials = [];
      const { id } = action.payload.courier_credential;
      state.courierCredentials.forEach(courierCredential => {
        let currentCourierCredential = courierCredential;
        if (courierCredential.id === id)
          currentCourierCredential = action.payload.courier_credential;
        newCourierCredentials.push(currentCourierCredential);
      });
      return {
        ...state,
        courierCredentialsLoading: false,
        courierCredential: initialState.courierCredential,
        courierCredentials: newCourierCredentials
      };
    }
    case `${COURIER_CREDENTIALS} ${DELETE} ${API_SUCCESS}`: {
      const newCourierCredentials = state.courierCredentials;
      const index = findDeletedIndex(newCourierCredentials, action.payload.id);
      newCourierCredentials.splice(index, 1);
      return {
        ...state,
        courierCredentials: [...newCourierCredentials],
        courierCredentialsLoading: false
      };
    }
    case CLEAN_COURIER_CREDENTIAL:
      return {
        ...state,
        courierCredential: null
      };
    case CLEAN_COURIER_CREDENTIAL_KEYS:
      return {
        ...state,
        courierCredentialKeys: initialState.courierCredentialKeys
      };
    case ADD_COURIER_CREDENTIAL_KEY: {
      return {
        ...state,
        courierCredentialKeys: [...state.courierCredentialKeys, action.payload]
      };
    }
    case DELETE_COURIER_CREDENTIAL_KEY: {
      const newCourierCredentialKeys = state.courierCredentialKeys;
      newCourierCredentialKeys.splice(action.payload, 1);
      return {
        ...state,
        courierCredentialKeys: [...newCourierCredentialKeys]
      };
    }
    case `${CREDENTIAL_KEYS} ${READ} ${API_SUCCESS}`:
      return {
        ...state,
        courierCredentialsLoading: false,
        courierCredentialKeys: action.payload
      };
    case SET_WANT_ADD_BASE_KEY:
      return {
        ...state,
        wantAddBaseKey: action.payload
      };
    case SET_SHOW_COURIER_CREDENTIAL_KEYS:
      return {
        ...state,
        showCourierCredentialKeys: action.payload
      };
    case `${CREDENTIAL_KEYS} ${CREATE} ${API_SUCCESS}`:
      return {
        ...state,
        courierCredentialsLoading: false
      };
    case SET_COURIER_SERVICE_TYPE_ID:
      return {
        ...state,
        courierServiceTypeId: action.payload
      };
    case SET_COURIER_CREDENTIAL_KEY_ID:
      return {
        ...state,
        courierCredentialKeyId: action.payload
      };
    case CLEAN_COURIER_CREDENTIAL_RULES:
      return {
        ...state,
        courierCredentialRules: initialState.courierCredentialRules,
        courierCredentialNames: initialState.courierCredentialNames
      };
    case ADD_COURIER_CREDENTIAL_RULE: {
      return {
        ...state,
        courierCredentialRules: [...state.courierCredentialRules, action.payload]
      };
    }
    case DELETE_COURIER_CREDENTIAL_RULE: {
      const newCourierCredentialRules = state.courierCredentialRules;
      newCourierCredentialRules.splice(action.payload, 1);
      return {
        ...state,
        courierCredentialRules: [...newCourierCredentialRules]
      };
    }
    case HIDDE_COURIER_CREDENTIAL_TYPE: {
      const newCourierCredentialNames = state.courierCredentialNames;
      newCourierCredentialNames[action.payload.index].hidden = action.payload.hidde;
      return {
        ...state,
        courierCredentialNames: [...newCourierCredentialNames]
      };
    }
    default:
      return { ...state };
  }
}

export default courierCredentials;
