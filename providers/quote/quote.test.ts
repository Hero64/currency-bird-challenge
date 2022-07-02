import Provider from '.';

jest.mock('@/constants/currencies', () => ({
  CURRENCIES: [
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
  ],
  CHILEAN_USD_VALUE: 757,
  CHILEAN_SPREAD: 0.004,
}));

describe('quote provider test', () => {
  describe('send', () => {
    it('should calculate send mount from PEN', () => {
      expect(Provider.send(1023408, 'PEN')).toBe(4600);
    });

    it('should calculate send mount from COP', () => {
      expect(Provider.send(1023408, 'COP')).toBe(4733336);
    });
  });

  describe('receive', () => {
    it('should calculate receive mount from PEN', () => {
      expect(Provider.receive(4600, 'PEN')).toBe(1023408);
    });

    it('should calculate receive mount from COP', () => {
      expect(Provider.receive(4733336, 'COP')).toBe(1023408);
    });
  });
});
