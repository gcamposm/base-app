import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const GOOGLE_TM_ID = publicRuntimeConfig.GOOGLE_TAG_MANAGER_ID;
