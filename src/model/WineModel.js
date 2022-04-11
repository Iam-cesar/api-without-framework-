class WineModel {
  constructor({ name, type, year }) {
    this.id = parseInt(Date.now() + (Math.random() + 1).toFixed())
    this.name = name
    this.type = type
    this.year = year
  }

  static validate (fields) {
    for (const field in fields) {
      if (!fields[field]) {
        return { isValid: true, error: `Invalid field ${field}` }
      }
    }
  }
}

module.exports = WineModel