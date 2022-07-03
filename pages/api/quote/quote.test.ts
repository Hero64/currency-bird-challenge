import { createServer, RequestListener } from 'http';
import { url } from 'inspector';
import { NextApiHandler } from 'next';
import { apiResolver } from 'next/dist/server/api-utils/node';
import supertest from 'supertest';

import Quote from './[type]';

export const client = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => {
    const urls = req.url?.split('/') || [];
    const type = urls[urls.length - 1];

    return apiResolver(
      req,
      res,
      { type },
      handler,
      {
        previewModeEncryptionKey: '',
        previewModeId: '',
        previewModeSigningKey: '',
      },
      false
    );
  };

  return supertest(createServer(listener));
};

const request = client(Quote);

let res: any;

describe('/quote', () => {
  describe('/send', () => {
    beforeAll(async () => {
      res = await request
        .post('/quote/send')
        .send({ amount: 1000, currencyCode: 'PEN' })
        .set('Accept', 'application/json');
    });

    it('should return correct status', () => {
      expect(res.status).toBe(200);
    });

    it('should return json header', () => {
      expect(res.headers['content-type']).toContain('application/json');
    });

    it('should return with amount', () => {
      expect(res.body).toHaveProperty('amount');
    });
  });

  describe('/receive', () => {
    beforeAll(async () => {
      res = await request
        .post('/quote/receive')
        .send({ amount: 1000, currencyCode: 'PEN' })
        .set('Accept', 'application/json');
    });

    it('should return correct status', () => {
      expect(res.status).toBe(200);
    });

    it('should return json header', () => {
      expect(res.headers['content-type']).toContain('application/json');
    });

    it('should return with amount', () => {
      expect(res.body).toHaveProperty('amount');
    });
  });

  describe('Bad type', () => {
    it('should return bad request status', async () => {
      res = await request
        .post('/quote/another')
        .send({ amount: 1000, currencyCode: 'PEN' })
        .set('Accept', 'application/json');

      expect(res.status).toBe(400);
    });
  });
});
