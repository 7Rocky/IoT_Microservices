const request = require('supertest')
const app = require('../src/app/app')

const REFRESH_TIME = 6000

describe('Humidity endpoints', () => {
  it('should return current humidity', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3))
    const res = await request(app).get('/humidity?username=Rocky')
    expect(res.statusCode).toBe(200)
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
    )
    expect(res.body[0].measure).toEqual('humidity')
    expect(res.body[0].username).toEqual('Rocky')
  }, 100000)

  it('should return an empty array', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3))
    const res = await request(app).get('/humidity')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([])
    )
  }, 100000)

  it('should return previous humidities', async () => {
    const res = await request(app)
      .get(
        '/humidities?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      )

    expect(res.statusCode).toBe(200)
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
          real_values: expect.arrayContaining([
            expect.any(Number)
          ]),
          sensor: expect.any(String),
          std_deviation: expect.any(Number),
          time_span: expect.any(Number),
          username: expect.any(String)
        })
      ])
    )
  }, 100000)

  it('should not return previous humidities', async () => {
    const res = await request(app)
      .get(
        '/humidities?' +
        'ip=192.168.1.50&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    )
  }, 100000)

  it('should not return previous humidities', async () => {
    const res = await request(app)
      .get(
        '/humidities?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    )
  }, 100000)
})

describe('Light endpoints', () => {
  it('should return current light', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3))
    const res = await request(app).get('/light?username=Rocky')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          digital_value: expect.any(Number),
          ip: expect.any(String),
          measure: expect.any(String),
          sensor: expect.any(String),
          timestamp: expect.any(Number),
          username: expect.any(String)
        })
      ])
    )
    expect(res.body[0].measure).toEqual('light')
    expect(res.body[0].username).toEqual('Rocky')
  }, 100000)

  it('should return an empty array', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3))
    const res = await request(app).get('/light')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([])
    )
  }, 100000)

  it('should return previous lights', async () => {
    const res = await request(app)
      .get(
        '/lights?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          digital_values: expect.arrayContaining([
            expect.any(Number)
          ]),
          end_date: expect.any(String),
          end_timestamp: expect.any(Number),
          init_date: expect.any(String),
          init_timestamp: expect.any(Number),
          mean_value: expect.any(Number),
          measure: expect.any(String),
          ip: expect.any(String),
          n_samples: expect.any(Number),
          sensor: expect.any(String),
          time_span: expect.any(Number),
          username: expect.any(String)
        })
      ])
    )
  }, 100000)

  it('should not return previous lights', async () => {
    const res = await request(app)
      .get(
        '/lights?' +
        'ip=192.168.1.50&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    )
  }, 100000)

  it('should not return previous lights', async () => {
    const res = await request(app)
      .get(
        '/lights?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    )
  }, 100000)

  it('should turn light off', async () => {
    const res = await request(app)
      .post('/light')
      .send({
        ip: '192.168.1.50',
        status: 'off',
        username: 'Rocky'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        digital_value: expect.any(Number),
        ip: expect.any(String),
        measure: expect.any(String),
        sensor: expect.any(String),
        timestamp: expect.any(Number),
        username: expect.any(String)
      })
    )
    expect(res.body.digital_value).toEqual(0)
    expect(res.body.measure).toEqual('light')
    expect(res.body.username).toEqual('Rocky')
  }, 100000)

  it('should turn light on', async () => {
    const res = await request(app)
      .post('/light')
      .send({
        ip: '192.168.1.50',
        status: 'on',
        username: 'Rocky'
      })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        date: expect.any(String),
        digital_value: expect.any(Number),
        ip: expect.any(String),
        measure: expect.any(String),
        sensor: expect.any(String),
        timestamp: expect.any(Number),
        username: expect.any(String)
      })
    )
    expect(res.body.digital_value).toEqual(1)
    expect(res.body.measure).toEqual('light')
    expect(res.body.username).toEqual('Rocky')
  }, 100000)
})

describe('Temperature endpoints', () => {
  it('should return current temperature', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3))
    const res = await request(app).get('/temperature?username=Rocky')
    expect(res.statusCode).toBe(200)
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
    )
    expect(res.body[0].measure).toEqual('temperature')
    expect(res.body[0].username).toEqual('Rocky')
  }, 100000)

  it('should return an empty array', async () => {
    await new Promise(r => setTimeout(r, REFRESH_TIME / 3))
    const res = await request(app).get('/temperature')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([])
    )
  }, 100000)

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
      )

    expect(res.statusCode).toBe(200)
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
          real_values: expect.arrayContaining([
            expect.any(Number)
          ]),
          sensor: expect.any(String),
          std_deviation: expect.any(Number),
          time_span: expect.any(Number),
          username: expect.any(String)
        })
      ])
    )
  }, 100000)

  it('should not return previous temperatures', async () => {
    const res = await request(app)
      .get(
        '/temperatures?' +
        'ip=192.168.1.50&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT&'+
        'end_date=Sat, 26 Apr 2020 00:01:35 GMT&'+
        'init_timestamp=1587855634077&'+
        'end_timestamp=1587862713879'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    )
  }, 100000)

  it('should not return previous temperatures', async () => {
    const res = await request(app)
      .get(
        '/temperatures?' +
        'ip=192.168.1.50&' +
        'username=Rocky&' +
        'init_date=Sat, 25 Apr 2020 23:59:33 GMT'
      )

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([ ])
    )
  }, 100000)
})
