const request = require('supertest');
const app = require('../src/app/app');

process.env.NODE_ENV = 'test';

const { REFRESH_TIME } = require('../src/app/constants/constants');
const amqplib = require('./__mocks__/amqplib');

describe('Auth endpoints', () => {
  it('should return current temperature', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3));
    const res = await request(app).get('/?username=Rocky');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          digital_value: expect.any(Number),
          ip: expect.any(String),
          measure: expect.any(String),
          real_value: expect.any(Number),
          sensor: expect.any(String),
          timestamp: expect.any(Number),
          username: expect.any(String)
        })
      ])
    );
  }, 100000);

  it('should return current an empty array', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3));
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([])
    );
  }, 100000);

  it('should return previous temperatures', async () => {
    const res = await request(app)
      .get(
        '/temperatures?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          end_date: expect.any(String),
          end_timestamp: expect.any(Number),
          init_date: expect.any(String),
          init_timestamp: expect.any(Number),
          max_value: expect.any(Number),
          mean_value: expect.any(Number),
          measure: expect.any(String),
          ip: expect.any(String),
          min_value: expect.any(Number),
          n_samples: expect.any(Number),
          sensor: expect.any(String),
          std_deviation: expect.any(Number),
          time_span: expect.any(Number),
          username: expect.any(String)
        })
      ])
    );
  }, 100000);

  it('should not return previous temperatures', async () => {
    const res = await request(app)
      .get(
        '/temperatures?' +
        'ip=192.168.1.50&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    );
  }, 100000);

  it('should not return previous temperatures', async () => {
    const res = await request(app)
      .get(
        '/temperatures?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT'
      );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    );
  }, 100000);

  it('should send temperature to queue', async () => {
    expect(amqplib.sent()).toBeFalsy();
    await new Promise(r => setTimeout(r, REFRESH_TIME));
    expect(amqplib.sent()).toBeTruthy();
  }, 100000);
});
