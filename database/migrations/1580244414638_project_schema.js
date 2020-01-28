'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned() // Força que seja apenas valores positivos
        .references('id') // Nome do campo referênciado
        .inTable('users') // Qual tabela irá referênciar
        .onUpdate('CASCADE') // Quando houver alteração do ID do usuário na tabela USERS, também afeta a tabela PROJECTS
        .onDelete('SET NULL') // Se um usuário for deletado, o USER_ID passa a ser NULL
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
