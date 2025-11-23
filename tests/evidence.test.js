const request = require('supertest');
const app = require('../src/app');

describe('Evidence Routes', () => {
  it('rejects POST without required fields', async () => {
    const res = await request(app).post('/api/evidence').send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });

  it('can GET evidence list', async () => {
    const res = await request(app).get('/api/evidence');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
