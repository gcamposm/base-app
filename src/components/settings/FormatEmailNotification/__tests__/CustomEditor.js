import { screen, render } from '@testing-library/react';

import CustomEditor from '../CustomEditor';

describe('Custom Editor', () => {
  it('should have an editable text field', () => {
    render(<CustomEditor initialText={{ content: 'Some Text', customizable: true }} />);

    const text = screen.getByText(/Some Text/);
    expect(text).toBeDefined();

    const wrapper = screen.getByTestId('editor-wrapper');
    expect(wrapper).toHaveStyle('background: none');
  });

  it('should not have an editable text field', () => {
    render(<CustomEditor initialText={{ content: 'Some Text', customizable: false }} />);

    const text = screen.getByText(/Some Text/);
    expect(text).toBeDefined();

    const wrapper = screen.getByTestId('editor-wrapper');
    expect(wrapper).toHaveStyle('background: rgb(217, 217, 217);');
  });
});
