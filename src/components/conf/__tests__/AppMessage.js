import { fireEvent, screen, render } from '@testing-library/react';

import AppMessage from '../AppMessage';

describe('App Message', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null)
      },
      writable: true
    });

    render(<AppMessage />);
  });

  it('should have warning text', () => {
    const text = screen.getByText(/El cierre de entregas en mucha comunas/);
    expect(text).toMatchSnapshot();
  });

  it('should set localStorage variables', async () => {
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(0);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
