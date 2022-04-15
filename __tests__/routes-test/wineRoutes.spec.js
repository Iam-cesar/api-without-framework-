const Supertest = require('supertest')
const app = require('../../src/app')
const { ok, deepStrictEqual } = require('assert')

const MOCK_UPDATE = {
  name: "Rosero del norte - read",
  type: "rose brut",
  year: 1994
}

const MOCK_POST = {
  name: "Rosero del norte - read",
  type: "rose brut",
  year: 1994
}

describe('Test case for /wine router', function () {

  it('Test suite to default route', async () => {
    const response = await Supertest(app)
      .get('/')
      .expect(200)

    const expect = 'Default page'
    deepStrictEqual(response.text, expect)
  })

  describe('Test suite to GET /wine, Should...', () => {
    it('to get a response an return a json', async () => {
      const response = await Supertest(app)
        .get('/wine')
        .expect(200)

      ok(JSON.parse(response.text), typeof Object)
    })

    it('to get a response an return a json', async () => {
      const response = await Supertest(app)
        .get('/wine')
        .expect(200)

      ok(JSON.parse(response.text), typeof Object)
    })
  })

  describe('Test suite to POST /wine, Should...', () => {
    it('append a new register', async () => {
      const response = await Supertest(app)
        .post('/wine')
        .send(MOCK_POST)
        .expect(200)

      const expect = 'append a wine'
      deepStrictEqual(response.text, expect)
    })
  })

  describe('Test suite to DELETE /wine, Should...', () => {
    it('delete a register', async () => {
      const response = await Supertest(app)
        .delete('/wine')
        .expect(200)

      const expect = 'delete a wine'
      deepStrictEqual(response.text, expect)
    })
  })

  describe('Test suite to PUT /wine, Should...', () => {
    it('update a register', async () => {
      const response = await Supertest(app)
        .put('/wine')
        .send(MOCK_UPDATE)
        .expect(200)

      const expect = 'update a wine'
      deepStrictEqual(response.text, expect)
    })
  })
})