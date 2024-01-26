import numbro from 'numbro';
import Router from 'next/router';
// eslint-disable-next-line import/no-cycle
import { getAuthInfo } from './auth';
// eslint-disable-next-line import/no-cycle
import { courierImagePath } from './api';

export const formatCurrencyValue = value => {
  if (!value) return '$0';

  return (
    value && numbro(value).formatCurrency({ thousandSeparated: true, negative: 'parenthesis' })
  );
};

export const numberWithCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

export const redirectTo = (path, ctx) => {
  if (ctx && ctx.res) {
    ctx.res.writeHead(302, {
      Location: path
    });
    ctx.res.end();
  } else {
    Router.push(path);
  }
};

export const isNotPrintable = shipment => {
  if (
    !['', null, undefined].includes(shipment.tracking_number) &&
    !['', null, undefined].includes(shipment.pack_pdf) &&
    !['', null, undefined].includes(shipment.courier_for_client) &&
    ['in_preparation', 'created', 'requested', 'pending'].includes(shipment.status) &&
    !shipment.check_in &&
    !shipment.check_out &&
    !shipment.is_returned
  ) {
    return false;
  }
  return true;
};

export const format = value =>
  value
    .replace(/\D/, '')
    .split(' ')
    .join('');

export const isFormateable = value => value && (typeof value === 'string' && value.length);

export const getImageByStatus = status => {
  let imagePath = '';
  switch (status) {
    case 0:
    case 17:
      imagePath = 'picking.png';
      break;
    case 1:
      imagePath = 'truck-full.png';
      break;
    case 2:
      imagePath = 'package-full.png';
      break;
    case 3:
      imagePath = 'fragile.png';
      break;
    case 4:
      imagePath = 'store.png';
      break;
    case 5:
      imagePath = 'support.png';
      break;
    default:
      imagePath = 'support.png';
      break;
  }
  return imagePath;
};

export const extractContent = html => {
  return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent;
};

export const getCountry = () => {
  try {
    const { country } = getAuthInfo();
    if (country === undefined) throw Error;
    return country;
  } catch (error) {
    return { name: 'Chile' };
  }
};

export const normalizedName = name => {
  try {
    return name
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  } catch (error) {
    return 'chile';
  }
};

export const getImage = courier => {
  if ([undefined, '', null].includes(courier)) return 'shipit.png';
  if (['Fulfillment Delivery', 'fulfillment delivery'].includes(courier))
    return `${courierImagePath}fulfillmentdelivery.png`;

  return `${courierImagePath}${courier.toLowerCase()}.png`;
};

export const changeFrequency = (params, companyId) => {
  return {
    ...params,
    company_id: companyId,
    frequency: typeof params.frequency === 'object' ? params.frequency.join(' ') : params.frequency
  };
};
