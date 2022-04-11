const ICrud = require('../../src/interfaces/ICrud')
const { throws } = require('assert')

class Test extends ICrud { }

(() => {
  // Test coverage for Interface CRUD
  {
    const result = new Test().read
    throws(() => result())
  }
  {
    const result = new Test().create
    throws(() => result())
  }
  {
    const result = new Test().delete
    throws(() => result())
  }
  {
    const result = new Test().update
    throws(() => result())
  }
})()

