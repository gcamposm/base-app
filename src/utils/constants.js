import { FaWarehouse, FaShippingFast, FaPrint } from 'react-icons/fa';

export const floatNumberValidation = /^\d+((,\d+)|(.\d+)){0,1}?$/;

export const cardProps = {
  bordered: false
};

export const colorState = {
  pending: '#c27ba0',
  in_preparation: '#1f97e7',
  in_route: '#f4cf58',
  delivered: '#04c778',
  by_retired: '#04c778',
  retired_by: '#1f97e7',
  failed: '#dd7272',
  other: '#484a7d',
  indemnify: '#f6b867',
  ready_to_dispatch: '', // Con Check In
  dispatched: '#1f97e7',
  at_shipit: '#00c2de',
  returned: '',
  created: '#1f97e7',
  received_for_courier: '#f4cf58',
  requested: '#1f97e7',
  first_closed_address: '#f6b867',
  second_closed_address: '#dd7272',
  back_in_route: '#dd7272',
  incomplete_address: '#dd7272',
  unexisting_address: '#dd7272',
  reused_by_destinatary: '#dd7272',
  unkown_destinatary: '#dd7272',
  unreachable_destiny: '#dd7272',
  strayed: '#e6b8af',
  damaged: '#e6b8af',
  indemnify_out_of_date: '#e6b8af',
  failed_with_observations: '',
  almost_failed: '',
  failed_by_retired: '#dd7272',
  returned_failed: '',
  returned_in_route: '',
  fulfillment_open: '#1f97e7',
  fulfillment_pending: '#1f97e7',
  fulfillment_success: '#1f97e7',
  fulfillment_partial: '#1f97e7',
  fulfillment_canceled: '#1f97e7',
};

export const services = {
  pick_and_pack: 0,
  fulfillment: 1,
  labelling: 2
};

export const servicesAssets = {
  pick_and_pack: {
    icon: FaShippingFast,
    color: '#00c2de'
  },
  fulfillment: {
    icon: FaWarehouse,
    color: '#484a7d'
  },
  labelling: {
    icon: FaPrint,
    color: '#3878E2'
  }
};

export const translationState = {
  pending: 'Envío no fue retirado',
  in_preparation: 'Envío Creado',
  in_route: 'En Ruta',
  delivered: 'Entregado',
  by_retired: 'Disponible en Sucursal',
  retired_by: 'Retirado Por Shipit',
  failed: 'Rechazado',
  other: 'Otro',
  indemnify: 'Reembolso Aprobado',
  ready_to_dispatch: 'Listo para despachar', // Con Check In
  dispatched: 'Entregado a Courier',
  at_shipit: 'Devuelto a Shipit',
  returned: 'Devuelto',
  created: 'Envío Creado',
  received_for_courier: 'Recibido por Courier',
  requested: 'Retiro Solicitado',
  first_closed_address: '1er Domicilio Cerrado',
  second_closed_address: '2do Domicilio Cerrado',
  back_in_route: 'En Proceso De Devolución',
  incomplete_address: 'Atención: Dirección Incompleta',
  unexisting_address: 'Atención: Dirección No Existe',
  reused_by_destinatary: 'Atención: Rehusado Por Destinatario',
  unkown_destinatary: 'Atención: Destinatario Desconocido',
  unreachable_destiny: 'Atención: Destino Sin Cobertura',
  strayed: 'Extraviado',
  damaged: 'Dañado',
  indemnify_out_of_date: 'Reembolso Fuera De Plazo',
  failed_with_observations: 'Fallido Con Observaciones',
  almost_failed: 'Casi Fallido',
  failed_by_retired: 'Atención: Rechazado',
  returned_failed: 'En Devolución',
  returned_in_route: 'En Devolución Al Remitente',
  fulfillment_open: 'Envío Creado',
  fulfillment_pending: 'Envío Creado',
  fulfillment_success: 'Envío Creado',
  fulfillment_partial: 'Envío Creado',
  fulfillment_canceled: 'Envío Creado'
};

export const filterState = {
  pending: 'pending',
  in_preparation: 'created,in_preparation,fulfillment',
  in_route: 'in_route',
  delivered: 'delivered',
  by_retired: 'by_retired',
  retired_by: 'retired_by',
  failed: 'failed',
  other: 'other',
  indemnify: 'indemnify',
  ready_to_dispatch: 'ready_to_dispatch',
  dispatched: 'dispatched',
  at_shipit: 'at_shipit',
  returned: 'returned',
  received_for_courier: 'received_for_courier',
  requested: 'requested',
  first_closed_address: 'first_closed_address',
  second_closed_address: 'second_closed_address',
  back_in_route: 'back_in_route',
  incomplete_address: 'incomplete_address',
  unexisting_address: 'unexisting_address',
  reused_by_destinatary: 'reused_by_destinatary',
  unkown_destinatary: 'unkown_destinatary',
  unreachable_destiny: 'unreachable_destiny',
  strayed: 'strayed',
  damaged: 'damaged',
  indemnify_out_of_date: 'indemnify_out_of_date',
  failed_with_observations: 'failed_with_observations',
  almost_failed: 'almost_failed',
  failed_by_retired: 'failed_by_retired',
  returned_failed: 'returned_failed',
  returned_in_route: 'returned_in_route'
};

export const genericStatuses = {
  0: 'Envío Creado',
  1: 'En Ruta',
  2: 'Entregado',
  3: 'Rechazado',
  4: 'Disponible en Sucursal',
  5: 'Otro',
  6: 'Envío no fue retirado',
  7: 'Otro',
  8: 'Reembolso Aprobado',
  9: 'Listo para despachar',
  10: 'Procesado en Shipit',
  11: 'Devuelto a Shipit',
  12: 'Devuelto',
  13: 'Envío Creado',
  14: 'Retiro Solicitado',
  15: 'Retirado Por Shipit',
  16: 'Otro',
  17: 'Recibido Por Courier',
  18: 'Fallido Con Observaciones',
  19: 'Casi Fallido',
  20: 'Envío Creado'
};

export const pickupColorStatus = {
  pending: '#58b5f4',
  shipped: '#04c778',
  shipped_with_issues: '#F4CF58',
  failed: '#E84C4C',
  cancelled: '#999999',
  no_retired: '#C27BA0'
};

export const pickAndPackColorStatus = {
  active: '#04C778',
  inactive: '#E84C4C',
  pending: '#c27ba0'
};

export const pickAndPackTranslateStatus = {
  active: 'Activo',
  inactive: 'Inactivo',
  pending: 'Pendiente'
};

export const pickAndPackStates = [
  { id: 0, name: 'active' },
  { id: 1, name: 'inactive' },
  { id: 2, name: 'pending' }
];

export const typeOfPickup = [
  { id: 0, name: 'Héroe', disabled: true, type: 'hero' },
  { id: 1, name: 'Retiro tradicional', disabled: true, type: 'courier' }
];

export const weekDays = [
  { id: 'L', name: 'lunes' },
  { id: 'M', name: 'martes' },
  { id: 'W', name: 'miércoles' },
  { id: 'J', name: 'jueves' },
  { id: 'V', name: 'viernes' }
];

export const pickupTranslateStatus = {
  pending: 'Pendiente',
  shipped: 'Retirado',
  shipped_with_issues: 'Retiro Incompleto',
  failed: 'Retiro Fallido',
  cancelled: 'Cancelado',
  no_retired: 'No retirado'
};

export const paymentState = {
  created: {
    color: '#00c2de',
    text: 'Factura Emitida'
  },
  paid: {
    color: '#04c778',
    text: 'Pagado'
  },
  no_paid: {
    color: '#f4cf58',
    text: 'No Pagado'
  },
  expired_soon: {
    color: '#1f97e7',
    text: 'Por vencer'
  },
  expired: {
    color: '#1f97e7',
    text: 'Vencida'
  },
  without_state: {
    color: '#484a7d',
    text: 'No Emitida'
  },
  no_emited: {
    color: '#484a7d',
    text: 'No Emitida'
  },
  to_cancel: {
    color: '',
    text: 'Por cancelar'
  }
};

export const refundsAccountable = {
  0: 'Shipit',
  1: 'Chilexpress',
  2: 'Starken',
  3: 'DHL',
  4: 'Muvsmart',
  5: 'Chileparcels',
  6: 'Motopartner',
  7: 'Bluexpress',
  8: 'Shippify'
};

export const emailNotificationsTab = {
  in_preparation: {
    title: 'Número de Seguimiento',
    popover: (
      <p>Se envía un correo al destinatario con el número de seguimiento asignado por el Courier</p>
    ),
    link: '/settings/format_email?emailType=in_preparation',
    color: '#3878E2',
    state: 'Sin Enviar'
  },
  in_route: {
    title: 'Pedido en Camino',
    popover: (
      <p>
        Se envía un correo al destinatario indicando que el pedido ya va en camino a la dirección de
        destino.
      </p>
    ),
    link: '/settings/format_email?emailType=in_route',
    color: '#f4cf58',
    state: 'En Ruta'
  },
  by_retired: {
    title: 'Pedido Listo para Retirar',
    popover: (
      <p>
        Se envía un correo al destinatario indicando que el pedido está disponible para ser retirado
        en la sucursal.
      </p>
    ),
    link: '/settings/format_email?emailType=by_retired',
    color: '#00C2DE',
    state: 'Por Retirar'
  },
  delivered: {
    title: 'Pedido Entregado',
    popover: <p>Se envía un correo al destinatario indicando que su pedido fue entregado.</p>,
    link: '/settings/format_email?emailType=delivered',
    color: '#04c778',
    state: 'Entregado'
  },
  failed: {
    title: 'Entrega Fallida',
    popover: (
      <p>
        Se envía un correo al destinatario cuando el courier tenga problemas para entregar el
        pedido.
      </p>
    ),
    link: '/settings/format_email?emailType=failed',
    color: '#e84c4c',
    state: 'Rechazado'
  },
  fulfillment_stock: {
    title: 'Notificación de Stock de Seguridad',
    popover: (
      <div>
        <p>
          Te enviaremos un correo cada vez que una unidad de SKU llegue al límite establecido de
          venta
          <br />
          Recuerda editar tu <b>Stock</b> de seguridad pulsando click en configuración -> editar
        </p>
      </div>
    )
  },
  with_price: {
    title: 'Envíos con Precio Superior a',
    popover: (
      <div>
        <p>
          Te enviaremos un correo cada vez que un pedido tenga precio de despacho mayor al
          configurado para esta notificación.
          <br />
          Recuerda ingresar las medidas correctas para que podamos estimar bien el precio de cada
          envío.
        </p>
      </div>
    ),
    state: '> $'
  },
  withdraw: {
    title: 'Solicitud Retiro',
    popover: (
      <div>
        <p>
          Te enviaremos un correo con la información de retiro de ese día <br />y los datos del
          transporte que pasará por tus pedidos.
        </p>
      </div>
    )
  },
  trackings: {
    title: 'Números de Seguimiento',
    popover: (
      <div>
        <p>
          Te enviaremos un correo con la información de todos los pedidos y su{' '}
          <b>Número de Seguimiento</b> asignado.
        </p>
      </div>
    )
  },
  _failed: {
    title: 'Notificaciones Fallidas del Día',
    popover: (
      <p>
        Te enviaremos un correo todos los pedidos del día que no pudieron entregarse y su motivo.
      </p>
    )
  }
};

export const WhatsappNotificationsTab = {
  in_preparation: {
    title: 'Número de Seguimiento',
    link: '/settings/format_whatsapp?whatsappType=in_preparation',
    color: '#3878E2',
    state: 'Sin Enviar'
  },
  in_route: {
    title: 'Pedido en Camino',
    link: '/settings/format_whatsapp?whatsappType=in_route',
    color: '#f4cf58',
    state: 'En Ruta'
  },
  by_retired: {
    title: 'Pedido Listo para Retirar',
    link: '/settings/format_whatsapp?whatsappType=by_retired',
    color: '#00C2DE',
    state: 'Por Retirar'
  },
  delivered: {
    title: 'Pedido Entregado',
    link: '/settings/format_whatsapp?whatsappType=delivered',
    color: '#04c778',
    state: 'Entregado'
  },
  failed: {
    title: 'Entrega Fallida',
    link: '/settings/format_whatsapp?whatsappType=failed',
    color: '#e84c4c',
    state: 'Rechazado'
  }
};

export const paymentRightDrawerWidth = {
  shipments: 1000,
  overcharges: 1000,
  refunds: 1100,
  pickup_cost: 450,
  fulfillment: 800,
  applications: 600,
  plan: 900
};

export const translateFulfillmentOthersCharge = {
  transport: 'Transporte',
  maquila: 'Maquila',
  labelled: 'Etiquetado',
  palletizing: 'Paletizado',
  packing: 'Packing',
  others: 'Otros'
};

export const orderColorState = {
  confirmed: '#58b5f4',
  draft: '#efefef',
  deliver: '#04c778',
  canceled: '#dd7272',
  archived: '#484a7d'
};

export const orderTranslationState = {
  confirmed: 'Lista para Enviar',
  draft: 'Borrador',
  deliver: 'Enviado',
  canceled: 'Cancelado',
  archived: 'Archivado'
};

export const orderTranslationStage = {
  origin: 'origen',
  destiny: 'destino',
  courier: 'courier',
  sizes: 'medidas'
};

export const printableStates = ['in_preparation', 'created', 'requested', 'pending'];

export const orderSchema = {
  service: '',
  state: 0,
  kind: 0,
  platform: 0,
  reference: '',
  items: 1,
  courier: {
    client: '',
    selected: false,
    id: 0,
    entity: 'shipit',
    shipment_type: '',
    tracking: '',
    zpl: '',
    epl: '',
    pdf: '',
    payable: false
  },
  origin: {
    street: null,
    number: null,
    complement: null,
    commune_id: 0,
    full_name: '',
    email: null,
    phone: null,
    store: false,
    origin_id: null,
    name: ''
  },
  destiny: {
    street: '',
    number: '',
    complement: '',
    commune_id: '',
    commune_name: '',
    full_name: '',
    email: '',
    phone: '',
    store: false,
    destiny_id: null,
    kind: '',
    courier_branch_office_id: null,
    name: ''
  },
  sizes: {
    width: 10,
    height: 10,
    length: 10,
    weight: 1,
    volumetric_weight: 1,
    store: false,
    packing_id: null,
    name: ''
  },
  products: [],
  insurance: {
    active: false,
    extra: false,
    detail: null,
    ticket_amount: 0,
    ticket_number: null,
    store: false,
    company_id: null
  }
};

export const dropOutReasons = [
  { id: 0, value: 'He dejado de hacer envíos por elecciones comerciales' },
  { id: 1, value: 'He cerrado mi negocio' },
  { id: 2, value: 'No se justifica el costo de Shipit' },
  { id: 3, value: 'Haré las entregas por mi cuenta' },
  { id: 4, value: 'Voy a trabajar con otro proveedor' },
  { id: 5, value: 'Me prometieron algo diferente' },
  { id: 6, value: 'Otro motivo' }
];

export const staticCountries = [
  { id: 1, name: 'Chile' },
  { id: 2, name: 'México' }
];

export const statusReaders = [
  { value: 'task', name: 'Habilitado por tarea' },
  { value: 'webhook', name: 'Habilitado por webhook' },
  { value: 'task_webhook', name: 'Habilitado por tarea y webhook' },
  { value: 'disabled', name: 'Deshabilitado' }
];

export const trackingGenerators = [
  { value: 'task', name: 'Habilitado por tarea' },
  { value: 'disabled', name: 'Deshabilitado' }
];

export const staticKindCourierOperationalInformation = [
  { id: 0, value: 'proactive_monitoring', name: 'Seguimiento Proactivo' },
  { id: 1, value: 'claim', name: 'Reclamo' }
];

export const shipmentDiscountsTranslations = {
  flat: 'Tarifa plana',
  percentage: 'Tarifa porcentual',
  company_id: 'ID de Compañía',
  equal: 'Igual a',
  include_in: 'Incluido en'
};

export const monthlyChargesTranslations = {
  charges_pick_and_pack: 'Pick and Pack',
  charges_fulfillment: 'Fullfilment'
};

export const ruleNamesTranslations = {
  company_id: 'ID de Compañía',
  region_id: 'ID de Región Local',
  origin_region_id: 'ID de Región Origen',
  destiny_region_id: 'ID de Región Destino',
  courier_id: 'ID de Courier',
  acquisition_segment_id: 'ID de Segmento de Adquisición',
  retention_segment_id: 'ID de Segmento de Retención',
  origin_commune_id: 'ID de Comuna Origen',
  destiny_commune_id: 'ID de Comuna Destino'
};

export const keyTranslations = {
  'ID de Compañía': 'company_id',
  'ID de Región Local': 'region_id',
  'ID de Región Origen': 'origin_region_id',
  'ID de Región Destino': 'destiny_region_id',
  'ID de Courier': 'courier_id',
  'ID de Segmento de Adquisición': 'acquisition_segment_id',
  'ID de Segmento de Retención': 'retention_segment_id',
  'ID de Comuna Origen': 'origin_commune_id',
  'ID de Comuna Destino': 'destiny_commune_id'
};

export const conditionsTranslations = {
  equal: 'Igual a',
  include_in: 'Incluido en'
};

export const sourceTypes = [
  { translation: 'Región', type: 'Region' },
  { translation: 'Comuna', type: 'Commune' }
];

export const courierCredentialConditions = [{ translation: 'Igual a', value: 'equal_to' }];

export const courierCredentialRuleTypeTranslations = {
  company_id: 'ID de Compañía',
  origin_id: 'ID de Origen'
};

export const courierCredentialRuleConditionTranslations = {
  equal_to: 'Igual a'
};

export const months = [
  { name: 'Enero', key: 1 },
  { name: 'Febrero', key: 2 },
  { name: 'Marzo', key: 3 },
  { name: 'Abril', key: 4 },
  { name: 'Mayo', key: 5 },
  { name: 'Junio', key: 6 },
  { name: 'Julio', key: 7 },
  { name: 'Agosto', key: 8 },
  { name: 'Septiembre', key: 9 },
  { name: 'Octubre', key: 10 },
  { name: 'Noviembre', key: 11 },
  { name: 'Diciembre', key: 12 }
];

export const asyncProcessKinds = [
  {
    en: 'load_measurements',
    es: 'Medidas de pedidos',
    headers: ['id', 'width', 'height', 'length', 'weight'],
    file:
      'https://s3-us-west-2.amazonaws.com/shipit-public/plantilla_base_actualizacion_precios.xlsx',
    dynamic_headers: false
  },
  {
    en: 'not_picked_not_charged_packages',
    es: 'Pedidos no retirados ni activados',
    headers: [
      'id',
      'status',
      'is_paid_shipit',
      'paid_by_shipit_reason',
      'shipping_price',
      'shipping_cost',
      'operation_date'
    ],
    file:
      'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/plantilla_base_pm_paquetes_no_retirados_ni_activados.xlsx',
    dynamic_headers: false
  },
  {
    en: 'load_prices_and_costs',
    es: 'Reajuste precios y costos de envíos',
    headers: ['id', 'shipping_price', 'shipping_cost'],
    file:
      'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/plantilla_base_actualizacion_precios_y_costos.xlsx',
    dynamic_headers: false
  },
  {
    en: 'debtors_companies',
    es: 'Des/bloqueo de clientes por deuda',
    headers: ['id', 'debtors'],
    file:
      'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/plantilla_base_pm_clientes_deudores.xlsx',
    dynamic_headers: false
  },
  {
    en: 'upload_price_or_cost_v3',
    es: 'Cargar precios o costos a calculadora V3',
    headers: [
      'country_id',
      'kind',
      'courier',
      'service_type',
      'origin_type',
      'origin',
      'destiny_type',
      'destiny',
      'zone',
      'transport_type',
      'delivery_type',
      'payment_type',
      'days',
      'additional'
    ],
    file:
      'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/planilla_base_precios_costos_calculadora_v3.xlsx',
    dynamic_headers: true
  },
  {
    en: 'load_discounts',
    es: 'Reajuste de descuentos',
    headers: ['id'],
    file: 'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/planilla_base_descuentos.xlsx',
    dynamic_headers: false
  },
  {
    en: 'load_couriers',
    es: 'Reajuste de couriers',
    headers: ['company_id', 'courier_id', 'status'],
    file: 'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/planilla_base_couriers.xlsx',
    dynamic_headers: false
  },
  {
    en: 'load_source',
    es: 'Reajuste de orígenes/destinos',
    headers: ['source_id', 'source_type', 'kind', 'status', 'courier_id'],
    file: 'https://shipit-docs.s3-us-west-2.amazonaws.com/base_sheets/planilla_base_source.xlsx',
    dynamic_headers: false
  }
];

export const asyncProcessStatusTranslations = {
  pending: 'Pendiente',
  in_progress: 'En progreso',
  completed: 'Finalizado',
  error: 'Error'
};
