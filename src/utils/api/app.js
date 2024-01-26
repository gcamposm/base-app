import { url, getHeaders } from '../api';

export const requestUserPlan = companyId => ({
  url: `${url}/subscriptions/${companyId}`,
  method: 'GET',
  headers: getHeaders()
});

export const requestPlans = () => ({
  url: `${url}/plans`,
  method: 'GET',
  headers: getHeaders()
});

export const updateUserPlan = id => ({
  url: `${url}/subscriptions/change_plan`,
  method: 'PATCH',
  data: { subscription: { plan_id: id } },
  headers: getHeaders()
});

export const createUserPlan = id => ({
  url: `${url}/setups/subscriptions`,
  method: 'POST',
  data: { subscription: { plan_id: id } },
  headers: getHeaders()
});

export const getDate = () => ({
  url: '/getDate',
  method: 'GET'
});

export const requestServerTime = () => {
  return {
    url: '/api/app',
    method: 'GET'
  };
};
