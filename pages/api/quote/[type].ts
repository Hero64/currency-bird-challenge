import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import QuoteProvider from '@/providers/quote';

import { QuoteType } from './type';

export default connect().post((req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const type = req.query.type as QuoteType;
  const { amount, currencyCode } = JSON.parse(body);

  if (!['send', 'receive'].includes(type)) {
    return res.status(400);
  }

  res.json({
    amount: QuoteProvider[type](Number(amount), currencyCode),
  });
});
