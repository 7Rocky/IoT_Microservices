const request = require('supertest')
const app = require('../src/app/app')

let accessToken
let refreshToken
const username = 'Rocky'
const password = 'password'

describe('Measure endpoints', () => {
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

  it('Get temperature without access token', async () => {
    const res = await request(app).get('/temperature')
    expect(res.statusCode).toEqual(401)
  })

  it('Get temperature with access token', async () => {
    const res = await request(app).get('/temperature').set('Authorization', `Bearer ${accessToken}`)
    expect(res.statusCode).toEqual(200)
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
  }, 10000)

  it('Get temperatures with access token', async () => {
    const res = await request(app).get('/temperature?path=temperatures').set('Authorization', `Bearer ${accessToken}`)
    expect(res.statusCode).toEqual(200)
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
    )
  }, 10000)

  it('Get temperatures without access token', async () => {
    const res = await request(app).get('/temperature?path=temperatures')
    expect(res.statusCode).toEqual(401)
  }, 10000)
})