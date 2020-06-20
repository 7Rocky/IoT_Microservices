const request = require('supertest')
const app = require('../src/app/app')


describe('Microcontrollers endpoints from microservices', () => {
  it('should return list of measure microcontrollers', async () => {
    const res = await request(app).get('/temperature')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ip: expect.any(String),
          measure: expect.any(String),
          sensor: expect.any(String),
          username: expect.any(String)
        })
      ])
    )
  })
})

describe('Microcontrollers endpoints from UI', () => {
  it('should return list of users microcontrollers', async () => {
    const res = await request(app).get('/?username=Rocky')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ip: expect.any(String),
          measure: expect.any(String),
          sensor: expect.any(String),
          username: expect.any(String)
        })
      ])
    )
  }, 10000)

  it('should insert a new microcontroller', async () => {
    const res = await request(app)
      .post('/')
      .send({
        ip: '192.168.1.222',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(
      expect.objectContaining({
        ip: expect.any(String),
        measure: expect.any(String),
        sensor: expect.any(String),
        username: expect.any(String)
      })
    )
    expect(res.body.ip).toBe('192.168.1.222')
    expect(res.body.measure).toBe('temperature')
  }, 10000)

  it('should insert a new microcontroller', async () => {
    const res = await request(app)
      .post('/')
      .send({
        ip: 'fake-arduino-iot.eu-gb.mybluemix.net',
        measure: 'temperature',
        sensor: 'Fake Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(
      expect.objectContaining({
        ip: expect.any(String),
        measure: expect.any(String),
        sensor: expect.any(String),
        username: expect.any(String)
      })
    )
    expect(res.body.ip).toBe('fake-arduino-iot.eu-gb.mybluemix.net')
    expect(res.body.measure).toBe('temperature')
  }, 10000)

  it('should not insert a new microcontroller', async () => {
    const res = await request(app)
      .post('/')
      .send({
        ip: '192.168.1.50',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(204)
  }, 10000)

  it('should not insert a new microcontroller', async () => {
    const res = await request(app)
      .post('/')
      .send({
        ip: '192.168.1.350',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(400)
  }, 10000)

  it('should update a microcontroller', async () => {
    const res = await request(app)
      .put('/')
      .send({
        ip: '192.168.1.222',
        measure: 'temperature',
        old_ip: '192.168.1.50',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(
      expect.objectContaining({
        ip: expect.any(String),
        measure: expect.any(String),
        sensor: expect.any(String),
        username: expect.any(String)
      })
    )

    expect(res.body.ip).toBe('192.168.1.222')
    expect(res.body.measure).toBe('temperature')
  }, 10000)

  it('should not update a microcontroller', async () => {
    const res = await request(app)
      .put('/')
      .send({
        ip: '192.168.1.50',
        measure: 'temperature',
        old_ip: '192.168.1.200',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(404)
  }, 10000)

  it('should not update a microcontroller', async () => {
    const res = await request(app)
      .put('/')
      .send({
        ip: '192.168.1.350',
        measure: 'temperature',
        old_ip: '192.168.1.50',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(400)
  }, 10000)

  it('should delete a microcontroller', async () => {
    const res = await request(app)
      .delete('/')
      .send({
        ip: '192.168.1.50',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(200)
  }, 10000)

  it('should not delete a microcontroller', async () => {
    const res = await request(app)
      .delete('/')
      .send({
        ip: '192.168.1.222',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(404)
  }, 10000)
})
