const ICrud = require('../interfaces/ICrud')
const WineModel = require('../model/WineModel')
const { join } = require('path')
const {
  CONTENT_BODY_INVALID,
  FILE_PATH_INVALID,
  ID_INVALID
} = require('../constants/error')
const {
  readFileSync,
  writeFileSync
} = require('fs')

class WineService extends ICrud {
  constructor(filePath) {
    super()

    if (!filePath) return {
      message: FILE_PATH_INVALID
    }

    this.FILE_PATH = this.#normalizePath(filePath)
  }

  async read (id) {
    const data = await this.#getFile()
    const result = id ? data.filter(item => item.id === id) : data
    return result
  }

  async create (body) {
    if (!body)
      return { error: CONTENT_BODY_INVALID }

    const data = await this.#getFile()

    const { isValid, error } = WineModel.validate(body) || false

    if (isValid)
      return error

    const wineModel = new WineModel(body)

    const newBody = [
      ...data,
      wineModel
    ]

    await this.#setFile(newBody)

    return true
  }

  async update (id, body) {
    if (!body)
      return { error: CONTENT_BODY_INVALID }

    if (!id)
      return { error: ID_INVALID }

    const data = await this.#getFile()
    let [result] = await data.filter(item => item.id === id)

    result = {
      id: result.id,
      ...body
    }

    const updatedBody = [
      ...data,
      result
    ]

    await this.#setFile(updatedBody)

    return { message: 'Item successful updated !' }
  }

  async delete (id) {
    const data = await this.#getFile()
    const result = await id
      ? data.filter(item => item.id !== id)
      : data.filter(item => item.id === id)

    await this.#setFile(result)

    return {
      message: 'Item successful deleted !'
    }
  }

  async #setFile (value) {
    await writeFileSync(this.FILE_PATH, JSON.stringify(value))
  }

  async #getFile () {
    return JSON.parse(await readFileSync(this.FILE_PATH, 'utf8'))
  }

  #normalizePath (filePath) {
    return join(__dirname, filePath)
  }
}

module.exports = WineService
