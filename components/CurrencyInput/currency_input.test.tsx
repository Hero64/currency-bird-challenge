import { fireEvent, render, screen } from '@testing-library/react';

import Input from '.';

const handleOnChange = jest.fn();
const inputLabel = 'label test';
const value = '1000';

describe('CurrencyInput component', () => {
  beforeEach(() => {
    render(
      <Input
        label={inputLabel}
        value={value}
        onChange={handleOnChange}
        selectedCurrency={{
          code: 'CLP',
          name: 'Peso chileno',
          flag_image: 'chile.png',
        }}
      />
    );
  });

  afterAll(() => {
    handleOnChange.mockReset();
  });

  it('Should render component', () => {
    expect(screen.getByText(inputLabel)).toBeTruthy();
  });

  it('Should render Selector', () => {
    expect(screen.getByAltText('CLP')).toBeTruthy();
  });

  it('Should emit onChange event with numeric key press', () => {
    fireEvent.change(screen.getByLabelText(inputLabel), {
      target: {
        value: '100',
      },
    });

    expect(handleOnChange.mock.calls.length).toBe(1);
  });
});
