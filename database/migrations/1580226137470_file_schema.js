'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('file').notNullable() // Armazena o nome do arquivo físico
      table.string('name').notNullable() // Nome original do arquivo (igual veio do upload)
      table.string('type', 20) // imagem, pdf, etc
      table.string('subtype', 20) // png, jpge, jpg
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
