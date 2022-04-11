const WineService = require('../services/WineService')
const filePath = '../database/dbWine.json'
const wineService = new WineService(filePath)

module.exports = {
  '/wine:get': async (request, response) => {
    const data = await wineService.read()
    response.writeHead(200)
    return response.end(JSON.stringify(data))
  },
  '/wine:post': (request, response) => {
    response.writeHead(200)
    return response.end('append a wine')
  },
  '/wine:delete': (request, response) => {
    response.writeHead(200)
    return response.end('delete a wine')
  },
  '/wine:update': (request, response) => {
    response.writeHead(200)
    return response.end('update a wine')
  },
  default: (request, response) => {
    response.writeHead(200)
    return response.end('Default page')
  },
}