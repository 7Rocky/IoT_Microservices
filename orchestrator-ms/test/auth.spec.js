const jwt = require('jsonwebtoken')
const request = require('supertest')

const app = require('../src/app/app')
const { MAX_EXPIRATION_TIME, TOKEN_EXPIRATION_TIME, TOKEN_SECRET } = require('../src/config/jwt.config')

let accessToken
let refreshToken
const username = 'Rocky'
const password = 'password'

describe('Auth endpoints', () => {
  it('Login correct', async () => {
    const res = await request(app).post('/login').send({ username, password })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      })
    )
  })

  it('Bad login', async () => {
    const res = await request(app).post('/login').send({ username })
    expect(res.statusCode).toBe(400)
  })

  it('Login incorrect', async () => {
    const res = await request(app).post('/login').send({ username: 'Other Rocky', password })
    expect(res.statusCode).toBe(401)
  })

  it('Register correct', async () => {
    const res = await request(app).post('/register').send({ username: 'Other Rocky', password })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      })
    )
  })

  it('Bad register', async () => {
    const res = await request(app).post('/register').send({ username })
    expect(res.statusCode).toBe(400)
  })

  it('Register incorrect', async () => {
    const res = await request(app).post('/register').send({ username, password })
    expect(res.statusCode).toBe(401)
  })
})

describe('Refresh token endpoint', () => {
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

  it('should change refresh token and access token', async () => {
    await new Promise(r => setTimeout(r, 1000))
    const res = await request(app).post('/refresh').send({ refreshToken }).set('Authorization', `Bearer ${accessToken}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String)
      })
    )
    expect(res.body.refreshToken).not.toEqual(refreshToken)
    expect(res.body.accessToken).not.toEqual(accessToken)
  }, 60000)

  it('should not change refresh token and access token', async () => {
    await new Promise(r => setTimeout(r, 1000))
    const res = await request(app).post('/refresh').send({ refreshToken })
    expect(res.statusCode).toBe(400)
  }, 60000)

  it('wrong access token', async () => {
    await new Promise(r => setTimeout(r, 1000))
    const res = await request(app)
      .post('/refresh')
      .send({ refreshToken })
      .set('Authorization', `Bearer this-is-not-a-token`)

    expect(res.statusCode).toBe(400)
  }, 60000)

  it('should refresh token', async () => {
    const iat = Number((Date.now() / 1000 - MAX_EXPIRATION_TIME + 1).toFixed())
    const exp = iat + TOKEN_EXPIRATION_TIME
    const accessToken = jwt.sign({ username, iat, exp }, TOKEN_SECRET)

    const res = await request(app)
      .post('/refresh')
      .send({ refreshToken })
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.statusCode).toBe(200)
  }, 60000)

  it('should not refresh token because of time limit', async () => {
    const iat = Number((Date.now() / 1000 - MAX_EXPIRATION_TIME - 1).toFixed())
    const exp = iat + TOKEN_EXPIRATION_TIME
    const accessToken = jwt.sign({ username, iat, exp }, TOKEN_SECRET)

    const res = await request(app)
      .post('/refresh')
      .send({ refreshToken })
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.statusCode).toBe(401)
  }, 60000)
})
