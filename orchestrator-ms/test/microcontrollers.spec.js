const request = require('supertest')
const app = require('../src/app/app')

let accessToken
let refreshToken

const username = 'Rocky'
const password = 'password'

describe('Microcontrollers endpoints from UI', () => {
  beforeAll(done => {
    request(app)
      .post('/login')
      .send({ username, password })
      .end((err, res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            accessToken: expect.any(String),
            refreshToken: expect.any(String)
          })
        )

        accessToken = res.body.accessToken
        refreshToken = res.body.refreshToken
        done()
      })
  })

  it('should return list of users microcontrollers', async () => {
    const res = await request(app).get('/microcontrollers').set('Authorization', `Bearer ${accessToken}`)
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

  it('should not return list of users microcontrollers', async () => {
    const res = await request(app).get('/microcontrollers')
    expect(res.statusCode).toBe(401)
  }, 10000)

  it('should insert a new microcontroller', async () => {
    const res = await request(app)
      .post('/microcontrollers')
      .send({
        ip: '192.168.1.222',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual(
      expect.objectContaining({
        ip: expect.any(String),
        measure: expect.any(String),
        sensor: expect.any(String),
        username: expect.any(String)
      })
    )
  }, 10000)

  it('should not insert a new microcontroller', async () => {
    const res = await request(app)
      .post('/microcontrollers')
      .send({
        ip: '192.168.1.50',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(401)
  }, 10000)

  it('should update a microcontroller', async () => {
    const res = await request(app)
      .put('/microcontrollers')
      .send({
        ip: '192.168.1.222',
        measure: 'temperature',
        old_ip: '192.168.1.50',
        old_measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })
      .set('Authorization', `Bearer ${accessToken}`)

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
      .put('/microcontrollers')
      .send({
        ip: '192.168.1.50',
        measure: 'temperature',
        old_ip: '192.168.1.200',
        old_measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(401)
  }, 10000)

  it('should delete a microcontroller', async () => {
    const res = await request(app)
      .delete('/microcontrollers')
      .send({
        ip: '192.168.1.50',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.statusCode).toBe(200)
  }, 10000)

  it('should not delete a microcontroller', async () => {
    const res = await request(app)
      .delete('/microcontrollers')
      .send({
        ip: '192.168.1.222',
        measure: 'temperature',
        sensor: 'Grove - Temperature',
        username: 'Rocky'
      })

    expect(res.statusCode).toBe(401)
  }, 10000)
})