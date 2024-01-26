import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';

import Address from '../Addresses';
import { renderWithRedux } from '~/src/utils/test-helpers';
import addresses from '~/src/utils/mock-data/addresses';

describe('Settings Addresses', () => {
  let componentStore = null;
  beforeEach(async () => {
    axios.mockClear();
    axios.mockResolvedValueOnce({ data: addresses });

    const { store } = renderWithRedux(<Address />);
    componentStore = store;
  });

  it('should have an empty message if there are no addresses', () => {
    renderWithRedux(<Address />);
    expect(screen.getByText(/No tienes Direcciones guardadas/)).toBeTruthy();
  });

  it('should have a list of addresses when load', async () => {
    addresses.forEach(address => expect(screen.getByText(address.phone)).toBeTruthy);
  });

  it('should have a disabled delete button for Origin', async () => {
    const originDeleteButton = screen.getByTestId('delete-address-Origin');
    expect(originDeleteButton).toHaveAttribute('disabled');

    const destinyDeleteButton = screen.getByTestId('delete-address-Destiny');
    expect(destinyDeleteButton).not.toHaveAttribute('disabled');
  });

  it('should be able to delete an address', async () => {
    const destinyDeleteButton = screen.getByTestId('delete-address-Destiny');
    fireEvent.click(destinyDeleteButton);

    await expect(axios).toHaveBeenCalledTimes(2);

    expect(screen.queryByText('origin@email.com')).toBeTruthy();
    expect(screen.queryByText('return@email.com')).toBeTruthy();
    expect(screen.queryByText('destiny@email.com')).not.toBeTruthy();
  });

  it('should fire a modal on edit', async () => {
    const editButton = screen.getByTestId('edit-address-Destiny');

    fireEvent.click(editButton);

    await expect(axios).toHaveBeenCalledTimes(2);

    /* 
      For some reason the mocking of showModal stop working,
      for now I don't see any other option than to test the store to
      see if there was an update. But that's not the ideal, since the whole
      point of this library, is to avoid implementation detail test.
     */
    // expect(showModal).toHaveBeenCalledTimes(1);
    expect(componentStore.getState().modal.modalType).toEqual('ADDRESS');
  });

  it('should fire a modal on create', async () => {
    const addButton = screen.getByRole('button');
    expect(addButton).toHaveTextContent(/Agregar/);

    expect(componentStore.getState().modal.modalType).toBeNull();

    await fireEvent.click(addButton);

    expect(componentStore.getState().modal.modalType).toEqual('ADDRESS');
  });
});
