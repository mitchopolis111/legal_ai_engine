const request = require('supertest');
const app = require('../src/app');

describe('Version Endpoint', () => {
  it('returns version metadata', async () => {
    const res = await request(app).get('/version');
    expect(res.statusCode).toBe(200);
    expect(res.body.service).toBe('legal_ai_engine');
    expect(res.body.version).toBeDefined();
    expect(res.body.node).toBeDefined();
    expect(res.body.timestamp).toBeDefined();
  });
});
