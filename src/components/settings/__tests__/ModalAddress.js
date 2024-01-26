import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import ModalAddress from '../ModalAddress';
import { renderWithRedux } from '~/src/utils/test-helpers';

describe('Modal Addresses', () => {
  beforeEach(async () => {
    axios.mockClear();

    axios.mockResolvedValueOnce({
      data: [
        { id: 410, name: 'ACHAO' },
        { id: 308, name: 'LAS CONDES' }
      ]
    });

    await renderWithRedux(<ModalAddress />);
  });

  it('should have an empty form when loaded with no data', () => {
    expect(screen.getByPlaceholderText('Nombre')).toBeEmptyDOMElement();
  });

  it('should not be able to submit with empty form', async () => {
    const saveButton = screen.getByTestId('modal-save');
    fireEvent.click(saveButton);

    const errorMessages = await screen.findAllByText(/Campo requerido/);
    expect(errorMessages).toHaveLength(5);
  });

  it('sould be able to fill the form and submit', async () => {
    const alias = screen.getByPlaceholderText('Alias');
    fireEvent.change(alias, { target: { value: 'test alias' } });

    const name = screen.getByPlaceholderText('Nombre');
    fireEvent.change(name, { target: { value: 'test name' } });

    const email = screen.getByPlaceholderText('Correo');
    fireEvent.change(email, { target: { value: 'test@email.com' } });

    const phone = screen.getByPlaceholderText('Teléfono');
    fireEvent.change(phone, { target: { value: '3243252' } });

    const street = screen.getByPlaceholderText('Calle');
    fireEvent.change(street, { target: { value: 'Av Apoquindo' } });

    const number = screen.getByPlaceholderText('Número');
    fireEvent.change(number, { target: { value: 4422 } });

    const comunas = screen.getByText(/Comunas/);
    userEvent.click(comunas);
    fireEvent.click(screen.getByText(/LAS CONDES/));

    const saveButton = screen.getByTestId('modal-save');
    fireEvent.click(saveButton);

    const noErrors = await screen.queryAllByText(/Campo requerido/);

    expect(noErrors).toEqual([]);
  });
});
