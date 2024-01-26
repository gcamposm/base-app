/* eslint-disable dot-notation */
/* eslint-disable camelcase */
import readXlsxFile from 'read-excel-file';
import { notification } from 'antd';
import {
  READ,
  XLS,
  CLEAN_XLS_DATA,
  DELETE,
  ORDER,
  UPDATE,
  SKUS,
  IMPORTING_FILE
} from './actionTypes';
import { importXlsx, importXlsxFulfillment } from '~/src/utils/formValidations/importXLSX';
import { createMassiveShipments } from '~/src/actions/shipments';
import { getAuthInfo } from '~/src/utils/auth';
import { services, orderSchema } from '~/src/utils/constants';
import products from '~/src/utils/products';

const stepNames = {
  origin: 'Origen',
  destiny: 'Destino',
  orderDetails: 'Dimensiones',
  insurance: 'Seguro'
};

const stepNamesFF = {
  origin: 'Origen',
  destiny: 'Destino',
  orderDetails: 'Detalles',
  insurance: 'Seguro'
};

const validateData = (order, service = null, algorithm = null) => {
  const validateXls = service === 'fulfillment' ? importXlsxFulfillment : importXlsx;
  return validateXls(
    order.destiny['Tipo Entrega'],
    order.destiny['Por Pagar'],
    algorithm,
    order.insurance
  )
    .validate(order, { abortEarly: false })
    .then(valid => {
      return { ...order, valid: true };
    })
    .catch(({ inner }) => {
      let failures = { Origen: [], Destino: [], Dimensiones: [], Seguro: [] };
      if (service === 'fulfillment') {
        failures = { Origen: [], Destino: [], Detalles: [], Seguro: [] };
      }

      inner.map(({ message, path }) => {
        const deepObject = path.split('.');

        if (deepObject.length) {
          const [mainObject, key] = deepObject;

          if (service === 'fulfillment') {
            failures[stepNamesFF[mainObject]].push([key, message]);
          } else {
            failures[stepNames[mainObject]].push([key, message]);
          }
        }
      });
      return { ...order, valid: false, failures };
    });
};

const getBranchOffice = destiny => (dispatch, getState) => {
  const {
    couriers: { allCourierBranchOffices }
  } = getState();

  return allCourierBranchOffices.find(
    branchOffice => branchOffice.courier_bo_id === destiny['Sucursal']
  );
};

const checkIfSKUIsValid = orderDetails => (dispatch, getState) => {
  const {
    fulfillment: { skuList }
  } = getState();
  let skuValid = false;

  if (orderDetails.SKU) {
    skuList.forEach(sku => {
      if (sku.name === orderDetails.SKU.toString()) {
        skuValid = true;
      }
    });
  }

  return skuValid;
};

const CheckIfInsuranceIsValid = insurance => {
  if (insurance['Seguro adicional'] === 'No') return true;
  const product = products.filter(p => p === insurance.Contenido);
  const validation = {
    'Seguro correcto': insurance['Seguro adicional'] === 'Si',
    'Producto correcto': !!product,
    'Valor correcto':
      insurance['Valor declarado'] <= 70000 || insurance['Valor declarado'] > 1000000
  };

  return validation;
};

const CheckIfCommuneIsValid = name => (dispatch, getState) => {
  const {
    communes: { communes }
  } = getState();
  const commune = communes.find(commune => commune.name === name);
  return !!commune;
};

const checkIfCommuneIsValidForCourier = (courier, communeName) => (dispatch, getState) => {
  const {
    communes: { communes }
  } = getState();

  if (courier === 'Predeterminado') return true;

  const commune = communes.find(commune => commune.name === communeName);
  if (!commune) return false;

  const courierPresent = commune.couriers_availables[courier.toLowerCase()];
  return typeof courierPresent === 'string' && courierPresent.length > 0;
};

const addSKU = (data, sku) => dispatch => {
  const formatedSku = {
    [data.key]: {
      [sku.name]: parseInt(data.orderDetails.Cantidad, 10)
    }
  };

  dispatch({ type: `${UPDATE} ${SKUS}`, payload: formatedSku });
};

const validateStockQuantity = (sku, quantity) => (dispatch, getState) => {
  const {
    xls: { loaded_skus }
  } = getState();

  const skus = Object.values(loaded_skus).filter(x => Object.keys(x).includes(sku.name));
  const loadedAmount = skus.map(a => a[sku.name]).reduce((a, b) => a + b, 0);

  return loadedAmount + parseInt(quantity, 10) <= sku.amount;
};

const removeFromXlsList = payload => dispatch => {
  dispatch({ type: `${DELETE} ${SKUS}`, payload });
};

const checkSKUQuantity = (data, update = false) => (dispatch, getState) => {
  const {
    fulfillment: { skuList }
  } = getState();

  if (
    data.orderDetails.Cantidad &&
    parseInt(data.orderDetails.Cantidad, 10) &&
    data.orderDetails.SKU
  ) {
    const sku = skuList.find(sku => data.orderDetails.SKU.toString() === sku.name);
    if (!sku) return false;
    if (update) dispatch(removeFromXlsList(data.key));
    if (dispatch(validateStockQuantity(sku, data.orderDetails.Cantidad))) {
      dispatch(addSKU(data, sku));
      return true;
    }
  }
  return false;
};

export const parseXlsData = file => (dispatch, getState) => {
  const {
    app: {
      user: { service }
    },
    couriers: { algorithm }
  } = getState();

  readXlsxFile(file)
    .then(rows => {
      const data = [];
      const titles = rows[1];

      rows.forEach((row, index) => {
        if (index > 101) return;
        if (index > 1) {
          let obj = {};
          const origin = {};
          const destiny = {};
          const orderDetails = {};
          const insurance = {};
          const values = row;
          values.forEach((value, i) => {
            let verifiedValue = value;
            if (typeof value && value instanceof Date) {
              verifiedValue = '';
            }

            if (i <= 0) {
              origin[titles[i]] = verifiedValue;
            }
            if (i > 0 && i < 12) {
              destiny[titles[i]] = verifiedValue;
            }
            if (service === 'fulfillment') {
              if (i > 11 && i < 14) {
                orderDetails[titles[i]] = verifiedValue;
              }
              if (i > 13) {
                insurance[titles[i]] = verifiedValue;
              }
            } else {
              if (i > 11 && i < 16) {
                orderDetails[titles[i]] = verifiedValue;
              }
              if (i > 15) {
                insurance[titles[i]] = verifiedValue;
              }
            }
          });
          obj = {
            key: index,
            origin,
            destiny,
            orderDetails,
            insurance
          };
          if (service === 'fulfillment') {
            obj.orderDetails['SKU Existe'] = dispatch(checkIfSKUIsValid(orderDetails));
            obj.orderDetails['SKU Cantidad'] = !obj.orderDetails['SKU Existe']
              ? true
              : dispatch(checkSKUQuantity(obj));
          }
          destiny['Comuna Válida'] = dispatch(CheckIfCommuneIsValid(destiny.Comuna));
          destiny['Sucursal Válido'] = false;
          if (destiny['Tipo Entrega'] === 'Sucursal') {
            if (destiny['Sucursal']) {
              const selectedBranchOffice = dispatch(getBranchOffice(destiny));
              destiny['Sucursal Válido'] =
                (selectedBranchOffice && Object.keys(selectedBranchOffice).length > 0) || false;
            }
          } else {
            destiny['Destino Válido'] = true;
            if (destiny['Courier'] && destiny['Comuna Válida']) {
              const selectedCourier = dispatch(
                checkIfCommuneIsValidForCourier(destiny.Courier, destiny.Comuna)
              );
              destiny['Destino Válido'] = selectedCourier;
            }
          }

          insurance['Seguro'] = CheckIfInsuranceIsValid(insurance);
          data.push(validateData(obj, service, algorithm));
        }
      });

      Promise.all(data)
        .then(e =>
          dispatch({
            type: `${READ} ${XLS}`,
            payload: e
          })
        )
        .catch(e => {
          console.error(e);
        });
    })
    .catch(e => {
      console.error(e);
    });
};

export const cleanXlsData = () => dispatch => {
  dispatch({ type: CLEAN_XLS_DATA });
};

export const deleteOrder = payload => (dispatch, getState) => {
  const {
    xls: { loaded_skus, data }
  } = getState();
  const order = data.find(x => x.key === payload);

  dispatch(removeFromXlsList(payload));
  dispatch({ type: `${DELETE} ${ORDER}`, payload });

  dispatch(nextUpdate(order));
};

const orderConstruct = (order, row) => ({
  ...order,
  origin: {
    ...order.origin,
    ...row.origin
  },
  destiny: {
    ...order.destiny,
    ...row.destiny
  },
  orderDetails: {
    ...order.orderDetails,
    ...row.orderDetails
  },
  insurance: {
    ...order.insurance,
    ...row.insurance
  }
});

export const nextUpdate = order => (dispatch, getState) => {
  const {
    xls: { data },
    fulfillment: { skuList }
  } = getState();

  const nextUpdate = data.find(
    x =>
      !x.valid &&
      x.orderDetails.SKU &&
      x.orderDetails.SKU.toString() === order.orderDetails.SKU &&
      x.key !== order.key &&
      !x.failures.Origen.length &&
      !x.failures.Destino.length &&
      x.failures.Detalles.length === 1 &&
      x.failures.Detalles[0][0] === 'SKU Cantidad' &&
      dispatch(
        validateStockQuantity(
          skuList.find(sku => x.orderDetails.SKU.toString() === sku.name),
          x.orderDetails.Cantidad
        )
      )
  );

  if (nextUpdate) {
    dispatch(updateOrder(nextUpdate.key, nextUpdate));
  }
};

export const updateOrder = (key, row) => async (dispatch, getState) => {
  dispatch({ type: IMPORTING_FILE, payload: true });
  const {
    xls: { data },
    app: {
      user: { service }
    },
    couriers: { algorithm }
  } = getState();

  const order = data.find(x => x.key === key);
  let validQuantity = false;

  order.destiny['Comuna Válida'] = dispatch(CheckIfCommuneIsValid(row.destiny.Comuna));
  if (service === 'fulfillment') {
    order.orderDetails['SKU Existe'] = dispatch(checkIfSKUIsValid(row.orderDetails));

    validQuantity = !order.orderDetails['SKU Existe']
      ? true
      : dispatch(checkSKUQuantity({ ...row, key }, true));

    order.orderDetails['SKU Cantidad'] = validQuantity;
  }

  order.destiny['Sucursal Válido'] = false;
  if (row.destiny['Tipo Entrega'] === 'Sucursal') {
    if (row.destiny.Sucursal) {
      const selectedBranchOffice = dispatch(getBranchOffice(row.destiny));
      order.destiny['Sucursal Válido'] = Object.keys(selectedBranchOffice).length > 0;
    }
  } else {
    order.destiny['Destino Válido'] = true;
    if (row.destiny['Courier'] && order.destiny['Comuna Válida']) {
      const selectedCourier = dispatch(
        checkIfCommuneIsValidForCourier(row.destiny.Courier, row.destiny.Comuna)
      );
      order.destiny['Destino Válido'] = selectedCourier;
    }
  }

  order.insurance['Seguro'] = CheckIfInsuranceIsValid(row.insurance);
  const modifiedOrder = orderConstruct(order, row);
  const validatedOrder = await validateData(modifiedOrder, service, algorithm);
  if (validatedOrder.valid !== modifiedOrder.valid) {
    if (modifiedOrder.valid) {
      notification.warn({
        duration: 5,
        message: `Venta con ID ${order.origin['ID Venta']} pasó a Descartados`,
        description:
          'Se han encontrado fallos en la venta modificada. Puede encontrar los detalles en el icono de la Venta'
      });
    }
  }
  dispatch({ type: `${UPDATE} ${ORDER}`, payload: validatedOrder });

  if (validQuantity) {
    dispatch(nextUpdate(validatedOrder));
  }
};

const transformBoolean = value => (value && value.toLowerCase() === 'si') || false;
const separateAddressField = address => address.match(/[\d\.]+|\D+/g);

const constructOrderObject = ({
  service,
  courier,
  origin,
  destination,
  insurance,
  sizes,
  products = []
}) => {
  const newOrder = {
    ...orderSchema,
    service,
    state: 1,
    platform: 1,
    reference: origin['ID Venta'],
    courier: {
      ...orderSchema.courier,
      ...courier
    },
    destiny: {
      ...orderSchema.destiny,
      ...destination
    },
    products,
    sizes: {
      ...orderSchema.sizes,
      ...sizes
    },
    insurance: {
      ...orderSchema.insurance,
      ...insurance
    }
  };

  return newOrder;
};

const getCommunes = (type, name, id) => (dispatch, getState) => {
  const {
    communes: { communes }
  } = getState();

  if (type === 'Sucursal') {
    return communes.find(commune => commune.id === id);
  }
  return communes.find(commune => commune.name === name);
};

export const handleMassiveOrders = (callback = () => {}) => (dispatch, getState) => {
  const {
    xls: { data },
    couriers: { algorithm }
  } = getState();

  const info = getAuthInfo();
  const service = services[info.service.name];

  const validOrders = data.filter(x => x.valid);

  if (validOrders.length > 0) {
    const orders = validOrders.map(order => {
      const { origin, destiny, orderDetails, insurance } = order;

      let courier = {
        client: destiny['Courier'] ? destiny['Courier'].toLowerCase() : '',
        selected: !!destiny['Courier'],
        payable: transformBoolean(destiny['Por Pagar'])
      };

      let destination = {
        street: destiny['Calle'],
        number: destiny['Número'],
        complement: destiny['Complemento'],
        commune_id: destiny['commune_id'],
        commune_name: destiny['commune_name'],
        full_name: destiny['Destinatario'],
        email: destiny['Correo'],
        phone: destiny['Teléfono'],
        kind: destiny['Tipo Entrega'] === 'Sucursal' ? 'courier_branch_office' : 'home_delivery'
      };

      const width = orderDetails['Ancho'];
      const height = orderDetails['Alto'];
      const length = orderDetails['Largo'];
      const weight = orderDetails['Peso'];

      let volumetric = 0;
      if (width > 0 && height > 0 && length > 0) {
        volumetric = (width * height * length) / 4000;
      }

      const sizes = {
        width,
        height,
        length,
        weight,
        volumetric_weight: volumetric
      };

      if (destiny['Tipo Entrega'] === 'Sucursal') {
        if (destiny['Sucursal']) {
          const courierBranchOffice = dispatch(getBranchOffice(destiny));

          const [street, number] = separateAddressField(courierBranchOffice.address);

          const [client] = destiny['Sucursal'].split(' ');

          destination = {
            ...destination,
            commune_id: courierBranchOffice.commune_id,
            kind: 'courier_branch_office',
            street,
            number,
            complement: '',
            courier_id: courierBranchOffice.courier_id,
            courier_branch_office_id: courierBranchOffice.id
          };

          courier = {
            ...courier,
            id: courierBranchOffice.courier_id,
            client: client.toLowerCase(),
            selected: true
          };
        }
      } else if (!destiny['Courier'] || destiny['Courier'] === 'Predeterminado') {
        courier = {
          ...courier,
          id: 0,
          client: '',
          selected: false,
          ...algorithm
        };
      }

      const { name, id } = dispatch(
        getCommunes(destiny['Tipo Entrega'], destiny['Comuna'], destination.commune_id)
      );

      destination = {
        ...destination,
        commune_id: id,
        commune_name: name
      };

      const insurance_attributes = {
        ticket_number: insurance['N° documento'],
        detail: insurance['Contenido'],
        ticket_amount: insurance['Valor declarado'],
        extra: transformBoolean(insurance['Seguro adicional'])
      };

      return constructOrderObject({
        service,
        courier,
        origin,
        destination,
        sizes,
        insurance: insurance_attributes
      });
    });

    dispatch(createMassiveShipments(orders, callback));
  }
};

const getSku = name => (dispatch, getState) => {
  const {
    fulfillment: { skuList }
  } = getState();

  return skuList.find(sku => sku.name === name);
};

export const handleMassiveOrdersFulfillment = (callback = () => {}) => (dispatch, getState) => {
  const {
    xls: { data },
    couriers: { algorithm }
  } = getState();

  const info = getAuthInfo();
  const service = services[info.service.name];

  const validOrders = data.filter(x => x.valid);

  const hashedOrders = {};

  if (validOrders.length > 0) {
    validOrders.forEach(order => {
      const { origin, destiny, orderDetails, insurance } = order;

      let courier = {
        client: destiny['Courier'] ? destiny['Courier'].toLowerCase() : '',
        selected: !!destiny['Courier'],
        payable: transformBoolean(destiny['Por Pagar'])
      };

      let destination = {
        street: destiny['Calle'],
        number: destiny['Número'],
        complement: destiny['Complemento'],
        commune_id: destiny['commune_id'],
        commune_name: destiny['commune_name'],
        full_name: destiny['Destinatario'],
        email: destiny['Correo'],
        phone: destiny['Teléfono'],
        kind: destiny['Tipo Entrega'] === 'Sucursal' ? 'courier_branch_office' : 'home_delivery'
      };

      let products = [];
      let sizes = {};

      const selectedSku = dispatch(getSku(orderDetails.SKU.toString()));

      if (selectedSku) {
        products = [
          {
            width: selectedSku.width || 10,
            length: selectedSku.length || 10,
            height: selectedSku.height || 10,
            weight: selectedSku.weight || 10,
            sku_id: selectedSku.id,
            warehouse_id: selectedSku.warehouse_id,
            name: selectedSku.name,
            description: selectedSku.description,
            amount: orderDetails['Cantidad']
          }
        ];

        if (orderDetails['Cantidad'] < 2) {
          const { width, length, height, weight } = selectedSku;

          const volumetric_weight = (width * height, length) / 4000;

          sizes = {
            width,
            length,
            height,
            weight,
            volumetric_weight
          };

          products = [
            {
              width: selectedSku.width,
              length: selectedSku.length,
              height: selectedSku.height,
              weight: selectedSku.weight,
              sku_id: selectedSku.id,
              warehouse_id: selectedSku.warehouse_id,
              name: selectedSku.name,
              description: selectedSku.description,
              amount: orderDetails['Cantidad']
            }
          ];
        }
      }

      if (destiny['Tipo Entrega'] === 'Sucursal') {
        if (destiny['Sucursal']) {
          const courierBranchOffice = dispatch(getBranchOffice(destiny));
          const [street, number] = separateAddressField(courierBranchOffice.address);

          const [client] = destiny['Sucursal'].split(' ');

          destination = {
            ...destination,
            commune_id: courierBranchOffice.commune_id,
            kind: 'courier_branch_office',
            street,
            number,
            complement: '',
            courier_id: courierBranchOffice.courier_id,
            courier_branch_office_id: courierBranchOffice.id
          };

          courier = {
            ...courier,
            id: courierBranchOffice.courier_id,
            client: client.toLowerCase(),
            selected: true
          };
        }
      } else if (!destiny['Courier'] || destiny['Courier'] === 'Predeterminado') {
        courier = {
          ...courier,
          id: 0,
          client: '',
          selected: false,
          ...algorithm
        };
      }

      const { name, id } = dispatch(
        getCommunes(destiny['Tipo Entrega'], destiny['Comuna'], destination.commune_id)
      );

      destination = {
        ...destination,
        commune_id: id,
        commune_name: name
      };

      const insurance_attributes = {
        detail: insurance['Contenido'],
        ticket_amount: insurance['Valor declarado'],
        ticket_number: insurance['N° documento'],
        extra: transformBoolean(insurance['Seguro adicional'])
      };

      if (hashedOrders[origin['ID Venta']]) {
        hashedOrders[origin['ID Venta']]['products'].push(products[0]);
      } else {
        hashedOrders[origin['ID Venta']] = constructOrderObject({
          service,
          courier,
          origin,
          destination,
          sizes,
          insurance: insurance_attributes,
          products
        });
      }
    });

    const orders = Object.keys(hashedOrders).map(order_id => hashedOrders[order_id]);
    dispatch(createMassiveShipments(orders, callback));
  }
};
