import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

import QuoteProvider from '@/providers/quote';

import { QuoteType } from './type';

export default connect().post((req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const { amount, currencyCode } = body;

  const type = req.query.type as QuoteType;

  if (!['send', 'receive'].includes(type)) {
    return res.status(400).end();
  }

  res.json({
    amount: QuoteProvider[type](Number(amount), currencyCode),
  });
});
