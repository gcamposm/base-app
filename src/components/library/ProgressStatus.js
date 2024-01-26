/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

const ProgressStatus = ({
  statuses = [],
  genericStatus = 0,
  status = '',
  width = 20,
  service = 'pick_and_pack'
}) => {
  const preparation = () =>
    statuses.length > 1 || !['created', 'in_preparation', 'requested', 'fulfillment'].includes(status)
      ? 'checked.png'
      : 'clock-process.png';

  const retiredBy = () => {
    if (
      statuses.length > 1 ||
      ['in_route', 'delivered', 'by_retired', 'failed', 'received_for_courier'].includes(status)
    )
      return 'checked.png';

    if (service === 'pick_and_pack') {
      let image = '';
      switch (status) {
        case 'pending':
        case 'retired_by':
        case 'retired_by_dispatch':
        case 'ready_to_dispatch':
          image = 'clock-route.png';
          break;
        case 'dispatched':
          image = 'checked.png';
          break;
        case 'returned':
        case 'at_shipit':
          image = 'return.png';
          break;
        default:
          image = 'unchecked.png';
          break;
      }
      return image;
    }

    let image = '';
    switch (status) {
      case 'ready_to_dispatch':
        image = 'clock-route.png';
        break;
      case 'dispatched':
        image = 'checked.png';
        break;
      case 'returned':
      case 'at_shipit':
        image = 'return.png';
        break;
      default:
        image = 'unchecked.png';
        break;
    }
    return image;
  };

  const inRoute = () => {
    if (
      !statuses.length >= 2 ||
      ![
        'in_route',
        'delivered',
        'by_retired',
        'failed',
        'returned',
        'received_for_courier',
        'at_shipit'
      ].includes(status)
    )
      return 'unchecked.png';

    let image = '';
    switch (status) {
      case 'delivered':
      case 'by_retired':
        image = 'checked.png';
        break;
      case 'failed':
        image = 'warning.png';
        break;
      case 'returned':
      case 'at_shipit':
        image = 'return.png';
        break;
      case 'indemnify':
        image = 'image-damage.png';
        break;
      default:
        image = 'clock-route.png';
        break;
    }
    return image;
  };

  const delivered = () => {
    if (
      !statuses.length === 3 ||
      !['delivered', 'by_retired', 'returned', 'at_shipit'].includes(status)
    )
      return 'unchecked.png';

    let image = '';
    switch (status) {
      case 'delivered':
      case 'by_retired':
        image = 'checked.png';
        break;
      case 'returned':
      case 'at_shipit':
        image = 'return.png';
        break;
      default:
        image = 'clock-process.png';
        break;
    }
    return image;
  };

  const getImage = () => {
    switch (genericStatus) {
      case 0:
        return `../../../static/timeline/${preparation()}`;
      case 1:
        return `../../../static/timeline/${retiredBy()}`;
      case 2:
        return `../../../static/timeline/${inRoute()}`;
      case 3:
        return `../../../static/timeline/${delivered()}`;
      default:
        break;
    }
  };

  return <img width={width} src={getImage()} alt={status} />;
};

export default ProgressStatus;
