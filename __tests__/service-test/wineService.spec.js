const WineService = require('../../src/services/WineService')
const { deepStrictEqual, ok, throws } = require('assert')

const DB_MOCK = '../../__tests__/mocks/dbMock.json' // sem o ../../ da erro
const wineService = new WineService(DB_MOCK)

const MOCK_READ = {
  name: "Rosero del norte - read",
  type: "rose brut",
  year: 1994
}

const WINE_MOCK_CREATE = {
  name: "Casilero del diablo - create",
  type: "tinto suave",
  year: 1990
}

const WINE_MOCK_UPDATE = {
  name: "Viejo Castilio - update",
  type: "tinto seco",
  year: 1989
}

const WINE_MOCK_DELETE = {
  name: "Should not exist in DB",
  type: "tinto seco",
  year: 1989
}

describe('Test suit for wine service', function () {
  this.beforeAll(async () => {
    await wineService.create(MOCK_READ)
    await wineService.create(WINE_MOCK_DELETE)
  })

  describe('Test suite for read register', () => {

    it('Should read an object and return his value', async () => {
      const [data] = await wineService.read()
      const [result] = await wineService.read(data.id)
      deepStrictEqual(MOCK_READ.name, result.name)
    })

    it('Should read return one or more registers', async () => {
      const result = await wineService.read()
      ok(result.length > 1)
    })

    it('Should to throw an error if file path was invalid', () => {
      const result = new WineService()
      deepStrictEqual(result.message, 'Invalid file path')
    })
  })

  describe('Test suite for create a register', () => {
    it('Should be able to create a new register', async () => {
      const result = await wineService.create(WINE_MOCK_CREATE)
      ok(result)
    })

    it('Should to throw an error if body is empty', async () => {
      const result = await wineService.create()
      deepStrictEqual(result.error, 'The content is invalid')
    })

    it('Should to throw a error when NAME field is invalid', async () => {
      WINE_MOCK_CREATE.name = ''
      const result = await wineService.create(WINE_MOCK_CREATE)
      deepStrictEqual(result, 'Invalid field name')
    })

    it('Should to throw a error when TYPE field is invalid', async () => {
      WINE_MOCK_UPDATE.type = ''
      const result = await wineService.create(WINE_MOCK_UPDATE)
      deepStrictEqual(result, 'Invalid field type')
    })

    it('Should to throw a error when YEAR field is invalid', async () => {
      WINE_MOCK_DELETE.year = ''
      const result = await wineService.create(WINE_MOCK_DELETE)
      deepStrictEqual(result, 'Invalid field year')
    })
  })

  describe('Test suite for update register', () => {
    it('Should update a register by id', async () => {
      const [data] = await wineService.read()
      const result = await wineService.update(data.id, WINE_MOCK_UPDATE)
      deepStrictEqual(result.message, 'Item successful updated !')
    })

    it('Should to throw an error when update body is invalid', async () => {
      const result = await wineService.update(3)
      deepStrictEqual(result.error, 'The content is invalid')
    })

    it('Should to throw an error when update ID is invalid', async () => {
      const result = await wineService.update('', WINE_MOCK_UPDATE)
      deepStrictEqual(result.error, 'Invalid argument ID')
    })
  })

  describe('Test suite to delete a register', () => {
    it('Should be able to delete a user by ID', async () => {
      const [data] = await wineService.read()
      const result = await wineService.delete(data.id)
      deepStrictEqual(result.message, 'Item successful deleted !')
    })

    it('Should be able to delete all registers', async () => {
      const result = await wineService.delete()
      deepStrictEqual(result.message, 'Item successful deleted !')
    })
  })
})