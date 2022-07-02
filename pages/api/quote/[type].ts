import connect from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';

export default connect().post((req: NextApiRequest, res: NextApiResponse) => {
  const { body, query } = req;

  console.log(body, query);

  res.json({
    hello: 'world',
  });
});
