const request = require('supertest');
const app = require('../src/app/app');

describe('Fake-arduino endpoints', () => {
  it('Get temperature', async () => {
    const res = await request(app).get('/temperature');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('temperature');
    expect(res.body.temperature).toBeGreaterThan(0);
    expect(res.body.temperature).toBeLessThan(1023);
  });

  it('Get humidity', async () => {
    const res = await request(app).get('/humidity');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('humidity');
    expect(res.body.humidity).toBeGreaterThan(0);
    expect(res.body.humidity).toBeLessThan(1023);
  });
});
