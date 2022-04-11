class NotImplemented extends Error {
  constructor() {
    super('Method not implemented')
  }
}

class ICrud {
  create (body) {
    throw new NotImplemented()
  }

  update (id, body) {
    throw new NotImplemented()
  }

  delete (id) {
    throw new NotImplemented()
  }

  read (id) {
    throw new NotImplemented()
  }
}

module.exports = ICrud