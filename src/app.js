const http = require('http')
const router = require('./routes')
const PORT = 3000

const handle = (request, response) => {
  const { url, method } = request
  const chosen = router[`${url}:${method.toLowerCase()}`] || router.default
  response.writeHead(200)
  return chosen(request, response)
}

const app = http
  .createServer(handle)
  .listen(PORT, () => console.log(`Server is running on port ${PORT}`))

module.exports = app