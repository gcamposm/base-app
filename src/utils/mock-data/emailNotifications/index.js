export default {
  emailNotifications: {
    emailTabKey: 1,
    emailStates: {
      notification: {
        buyer: {
          mail: {
            cc: '',
            state: {
              in_preparation: {
                active: false,
                cc: false
              },
              in_route: {
                active: false,
                cc: false
              },
              by_retired: {
                active: false,
                cc: false
              },
              delivered: {
                active: false,
                cc: false
              },
              failed: {
                active: false,
                cc: false
              }
            }
          },
          client: {
            state: {
              in_preparation: false,
              failed: false
            },
            order_to_high: {
              enable: false,
              amount: ''
            },
            nps: {
              active: false,
              active_mailer: false,
              send_period: '',
              questions: {
                one: '¿Cómo fue tu experiencia de usuario?',
                two: '¿Qué te pareció el producto comprado?',
                three: '¿Cómo fue tu experiencia con el despacho?',
                four: '¿Recomendarías esta tienda a un amig@?'
              }
            }
          }
        },
        client: {
          state: {
            in_preparation: false,
            failed: false
          },
          order_to_high: {
            enable: false,
            amount: ''
          },
          fulfillment: {
            broke_stock: false,
            security_stock: false,
            email: ''
          }
        }
      }
    },
    loading: false,
    emailProps: {
      title_text: 'En Preparación',
      subject: '¡Estamos preparando tu pedido!',
      tracking_text: '{package_courier} - {tracking_number}.',
      one: {
        content:
          '<p>{buyer_name}{tracking_number}{package_reference}{package_courier}{package_courier}{package_reference}{package_reference}{package_courier}{package_courier}{package_reference}{buyer_name}😴Hola {buyer_name},{package_reference}De esta forma puedes probar tambien la experiencia de recibir una entrega con Shipit. Tu regalo debería ser despachado a través de . Este será tu número de seguimiento para que puedas revisar el estado de tu pedido:</p>\n<p>{package_courier}</p>\n',
        customizable: true
      },
      two: {
        content:
          '<p>Este número se encuentra desactivado, pero se activará una vez que entreguemos el producto a {package_courier} y podrás rastrear tu pedido en seguimiento.shipit.cl</p>\n<p>Saludos</p>\n<ol>\n<li>Tracking Nº: {tracking_number}</li>\n</ol>\n',
        customizable: true
      },
      three: {
        content:
          '<div><!--block-->Estamos siguiendo las recomendaciones internacionales de distanciamiento social y respetando los decretos de Cuarentena y Toque de Queda de las autoridades locales. Esto ha provocado tiempos de respuesta más largos y retrasos en nuestras entregas. Por favor, ten paciencia en este momento tan difícil para todos. Proteger nuestra salud merece la pena.&nbsp;</div><div><!--block--><br></div><div><!--block--><a href="https://seguimiento.shipit.cl/">Aquí </a>puedes dar seguimiento a tu pedido. Muchas de tus dudas pueden ser resueltas por ti, consultando <a href="https://shipitcl.zendesk.com/hc/es-419">nuestro centro de ayuda</a> o comunicándote con la tienda en la que realizaste la compra. Ellos pueden darte más información y ayudarte con tus dudas.&nbsp;</div><div><!--block--><br></div><div><!--block-->Lamentamos el inconveniente.<br><br></div>',
        customizable: false
      },
      title_color: '#f1e7e7',
      tracking_button: '#000000',
      tracking_text_color: '#ffffff',
      title_font_color: '#000000',
      tags: {
        buyer_name: 'Nombre Comprador',
        tracking_number: 'Nº de Seguimiento',
        package_reference: 'ID Pedido Cliente',
        package_courier: 'Courier'
      },
      tracking: true,
      preferences: {
        background_header: '#263535',
        background_footer: '#00c2de',
        font_color_footer: '#ffffff'
      },
      logo:
        '//shipit-customers.s3.amazonaws.com/companies/logos/000/000/001/small/company_Shipit.png?1551106667',
      text_one: {
        content:
          '<p>{buyer_name}{tracking_number}{package_reference}{package_courier}{package_courier}{package_reference}{package_reference}{package_courier}{package_courier}{package_reference}{buyer_name}😴Hola {buyer_name},{package_reference}De esta forma puedes probar tambien la experiencia de recibir una entrega con Shipit. Tu regalo debería ser despachado a través de . Este será tu número de seguimiento para que puedas revisar el estado de tu pedido:</p>\n<p>{package_courier}</p>\n',
        customizable: true
      },
      text_two: {
        content:
          '<p>Este número se encuentra desactivado, pero se activará una vez que entreguemos el producto a {package_courier} y podrás rastrear tu pedido en seguimiento.shipit.cl</p>\n<p>Saludos</p>\n<ol>\n<li>Tracking Nº: {tracking_number}</li>\n</ol>\n',
        customizable: true
      },
      text_three: {
        content:
          '<div><!--block-->Estamos siguiendo las recomendaciones internacionales de distanciamiento social y respetando los decretos de Cuarentena y Toque de Queda de las autoridades locales. Esto ha provocado tiempos de respuesta más largos y retrasos en nuestras entregas. Por favor, ten paciencia en este momento tan difícil para todos. Proteger nuestra salud merece la pena.&nbsp;</div><div><!--block--><br></div><div><!--block--><a href="https://seguimiento.shipit.cl/">Aquí </a>puedes dar seguimiento a tu pedido. Muchas de tus dudas pueden ser resueltas por ti, consultando <a href="https://shipitcl.zendesk.com/hc/es-419">nuestro centro de ayuda</a> o comunicándote con la tienda en la que realizaste la compra. Ellos pueden darte más información y ayudarte con tus dudas.&nbsp;</div><div><!--block--><br></div><div><!--block-->Lamentamos el inconveniente.<br><br></div>',
        customizable: false
      }
    },
    editable: false,
    popover: {
      in_preparation: false,
      in_route: false,
      by_retired: false,
      delivered: false,
      failed: false,
      fulfillment_stock: false,
      with_price: false,
      withdraw: false,
      _failed: false
    }
  }
};
