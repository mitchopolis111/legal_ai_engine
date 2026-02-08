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

  it('can GET a single evidence record', async () => {
    const res = await request(app).get('/api/evidence/test-id');
    expect(res.statusCode).toBe(200);
    expect(res.body.id || res.body._id).toBeDefined();
  });

  it('can PUT an evidence record with required fields', async () => {
    const payload = { source: 'TEXTLOG', path: '/tmp/file.txt', hash: 'abc', meta: { a: 1 } };
    const res = await request(app).put('/api/evidence/test-id').send(payload);
    expect(res.statusCode).toBe(200);
    expect(res.body.source).toBe(payload.source);
    expect(res.body.path).toBe(payload.path);
    expect(res.body.hash).toBe(payload.hash);
  });

  it('can DELETE an evidence record', async () => {
    const res = await request(app).delete('/api/evidence/test-id');
    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('can search evidence', async () => {
    const res = await request(app).post('/api/evidence/search').send({ query: 'sms' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('can export evidence list', async () => {
    const res = await request(app).post('/api/evidence/export').send({ ids: ['1', '2'] });
    expect(res.statusCode).toBe(200);
    expect(res.body.exported).toBeDefined();
  });

  it('can import evidence list', async () => {
    const items = [
      { source: 'TEXTLOG', path: '/tmp/a.txt', hash: 'h1', meta: { a: 1 } },
      { source: 'OFW', path: '/tmp/b.txt', hash: 'h2', meta: { b: 2 } }
    ];
    const res = await request(app).post('/api/evidence/import').send({ items });
    expect(res.statusCode).toBe(201);
    expect(res.body.imported).toBe(items.length);
  });

  it('can index evidence', async () => {
    const res = await request(app).post('/api/evidence/index').send({});
    expect(res.statusCode).toBe(200);
    expect(res.body.indexed).toBe(true);
  });
});
