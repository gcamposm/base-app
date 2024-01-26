export default {
  orders: {
    rightDrawerVisible: false,
    bottomDrawerVisible: false,
    selectedOrders: [],
    selectedCourier: [],
    orders: {
      orders: [
        {
          id: 13405,
          platform: 'integration',
          kind: 'shopify',
          reference: '#9979',
          items: 2,
          sandbox: false,
          company_id: 1,
          service: 'fulfillment',
          state: 'confirmed',
          products: [],
          payable: false,
          payment: {
            status: 'paid'
          },
          source: {
            channel: '',
            ip: '',
            browser: '',
            language: '',
            location: ''
          },
          seller: {
            id: 2539270832293,
            status: '',
            name: 'shopify',
            created_at: '2020-06-27T23:50:14-04:00',
            reference_site: 'https://froens.reversso.cl/VGlja2V0Tm9kZTo1MDEw/summary'
          },
          gift_card: {
            from: '',
            amount: 0,
            total_amount: 0
          },
          sizes: {
            width: 10,
            height: 10,
            length: 10,
            weight: 1,
            volumetric_weight: 1,
            store: false,
            packing_id: null,
            name: 'size for order #9979'
          },
          courier: {
            client: ''
          },
          prices: {},
          insurance: {
            ticket_number: '#9979',
            ticket_amount: 15000,
            detail: 'Chaqueta Cotele Chiporro Negro, Ticket de devolución Reversso',
            extra: false
          },
          state_track: {
            draft: '',
            confirmed: '2020-08-06 21:41:36',
            deliver: '',
            canceled: '',
            archived: ''
          },
          origin: {
            street: 'Apoquindo',
            number: '4499',
            complement: 'piso 13',
            commune_id: 308,
            full_name: 'staff shipit',
            email: 'staff@shipit.cl',
            phone: '9339392193',
            store: false,
            name: 'default'
          },
          destiny: {
            street: 'Barbastro',
            number: '11282',
            complement: 'casa',
            commune_id: 326,
            full_name: 'Francisca  Cruzat',
            email: 'franciscruzatds@gmail.com',
            phone: '+56 9 7861 1024',
            store: false,
            destiny_id: null,
            courier_branch_office_id: null,
            kind: 'home_delivery',
            name: 'order destiny #9979'
          },
          created_at: '2020-08-06T21:41:36.955-04:00',
          updated_at: '2020-08-06T21:41:36.955-04:00',
          valid: true,
          commune_name: 'VITACURA',
          ready_to_ship: {
            origin: true,
            destiny: true,
            sizes: true,
            courier: true
          }
        },
        {
          id: 13406,
          platform: 'integration',
          kind: 'shopify',
          reference: '#9902',
          items: 2,
          sandbox: false,
          company_id: 1,
          service: 'fulfillment',
          state: 'confirmed',
          products: [],
          payable: false,
          payment: {
            status: 'paid'
          },
          source: {
            channel: '',
            ip: '',
            browser: '',
            language: '',
            location: ''
          },
          seller: {
            id: 2535755251877,
            status: 'partial',
            name: 'shopify',
            created_at: '2020-06-25T16:08:22-04:00',
            reference_site: null
          },
          gift_card: {
            from: '',
            amount: 0,
            total_amount: 0
          },
          sizes: {
            width: 10,
            height: 10,
            length: 10,
            weight: 1,
            volumetric_weight: 1,
            store: false,
            packing_id: null,
            name: 'size for order #9902'
          },
          courier: {
            client: ''
          },
          prices: {},
          insurance: {
            ticket_number: '#9902',
            ticket_amount: 0,
            detail: 'Poleron Chiporro Burdeo, Ticket de devolución Chilexpress',
            extra: false
          },
          state_track: {
            draft: '',
            confirmed: '2020-08-06 21:41:37',
            deliver: '',
            canceled: '',
            archived: ''
          },
          origin: {
            street: 'Apoquindo',
            number: '4499',
            complement: 'piso 13',
            commune_id: 308,
            full_name: 'staff shipit',
            email: 'staff@shipit.cl',
            phone: '9339392193',
            store: false,
            name: 'default'
          },
          destiny: {
            street: 'Casa',
            number: '12',
            complement: 'Cond. Alto de Chicureo Colina',
            commune_id: 330,
            full_name: 'Maria Jesus Blanco',
            email: 'fblanco@fundamenta.cl',
            phone: '+56984392688',
            store: false,
            destiny_id: null,
            courier_branch_office_id: null,
            kind: 'home_delivery',
            name: 'order destiny #9902'
          },
          created_at: '2020-08-06T21:41:37.009-04:00',
          updated_at: '2020-08-06T21:41:37.009-04:00',
          valid: true,
          commune_name: 'COLINA',
          ready_to_ship: {
            origin: true,
            destiny: true,
            sizes: true,
            courier: true
          }
        }
      ],
      total: 126
    },
    sizes: {
      confirmed: 55,
      draft: 71
    },
    formOrder: {
      order: {
        service: 0,
        state: 1,
        kind: 0,
        platform: 0,
        reference: '',
        items: 1,
        origin: {},
        destiny: {},
        sizes: {},
        insurance: {},
        courier: {
          id: 0,
          client: '',
          entity: 'shipit',
          shipment_type: '',
          tracking: '',
          selected: false,
          zpl: '',
          epl: '',
          pdf: '',
          algorithm: '',
          algorithm_days: '',
          delivery_time: ''
        }
      }
    },
    loading: false,
    pricesLoading: false,
    orderPrices: {},
    downloadLinkLoader: false,
    order: {}
  }
};
