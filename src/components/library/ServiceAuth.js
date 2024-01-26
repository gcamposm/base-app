import React from 'react';
import { useSelector } from 'react-redux';

const ServiceAuth = ({
  PickAndPack = null,
  Fulfillment = null,
  Labelling = null,
  Otherwise = null
}) => {
  const user = useSelector(state => state.app.user);
  const renderSwitch = () => {
    switch (user.service) {
      case 'pick_and_pack':
        return PickAndPack || Otherwise;
      case 'fulfillment':
        return Fulfillment || Otherwise;
      case 'labelling':
        return Labelling || Otherwise;

      default:
        return Labelling;
    }
  };

  return <div>{renderSwitch()}</div>;
};

export default ServiceAuth;
