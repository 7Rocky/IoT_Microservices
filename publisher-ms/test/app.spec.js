const { main } = require('../src/app/app')
const amqplib = require('./__mocks__/amqplib/callback_api')

describe('Publish measures to queue', () => {
  it('should send three measures to queue', async () => {
    expect(amqplib.sent()).toEqual(0)
    await main()
    expect(amqplib.sent()).toEqual(3)
  }, 100000)
})
