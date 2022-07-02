import { fireEvent, render, screen } from '@testing-library/react';

import Selector from '.';

const handleOnCurrencyClick = jest.fn();

const currencies = [
  {
    usd_cost: 0.28,
    country: 'Perú',
    name: 'Soles',
    code: 'PEN',
    spread: 0.015,
    margin: 0.03,
    flag_image: 'peru.png',
  },
  {
    usd_cost: 0.00027,
    country: 'Colombia',
    name: 'Peso colombiano',
    code: 'COP',
    spread: 0.018,
    margin: 0.035,
    flag_image: 'colombia.png',
  },
];

describe('Selector component', () => {
  beforeEach(() => {
    render(
      <Selector
        currencies={currencies}
        selectedCurrency={currencies[0]}
        onCurrencyClick={handleOnCurrencyClick}
      />
    );
  });

  afterAll(() => {
    handleOnCurrencyClick.mockReset();
  });

  it('Should render component', () => {
    expect(screen.getByAltText(currencies[0].code)).toBeTruthy();
  });

  it('Should show currency list', () => {
    const flagImage = screen.getByAltText(currencies[0].code);

    fireEvent.click(flagImage);

    currencies.forEach((currency) => {
      expect(screen.getByText(currency.name)).toBeTruthy();
    });
  });

  it('Should trigger onClick event', () => {
    const flagImage = screen.getByAltText(currencies[0].code);

    fireEvent.click(flagImage);
    const secondCurrency = screen.getByText(currencies[1].name);
    fireEvent.click(secondCurrency);

    expect(handleOnCurrencyClick.mock.calls.length).toBe(1);
  });
});
