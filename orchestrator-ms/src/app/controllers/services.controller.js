const axios = require('axios')
const queryString = require('query-string')

const methodToConnectedService = async (res, url, method, body={ }, status=200, returnResponse=false) => {
  try {
    const response = await axios[method](url, body)
    if (returnResponse) return response
    if (!response.data) return res.sendStatus(404)
    return res.status(status).json(response.data)
  } catch(error) {
    return res.sendStatus(400)
  }
}

module.exports = class ServicesController {

  async getToConnectedService(res, service, path='', query={ }) {
    const url = `http://${service}/${path}?${queryString.stringify(query)}`
    return await methodToConnectedService(res, url, 'get')
  }

  async postToConnectedService(res, service, path='', body, status, returnResponse) {
    const url = `http://${service}/${path}`
    return await methodToConnectedService(res, url, 'post', body, status, returnResponse)
  }

  async putToConnectedService(res, service, path='', body, status) {
    const url = `http://${service}/${path}`
    return await methodToConnectedService(res, url, 'put', body, status)
  }

  async deleteToConnectedService(res, service, path='', body) {
    const url = `http://${service}/${path}`
    return await methodToConnectedService(res, url, 'delete', { data: body })
  }

}
