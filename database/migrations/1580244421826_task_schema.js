'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table
        .integer('project_id')
        .unsigned() // Força que seja apenas valores positivos
        .notNullable()
        .references('id') // Nome do campo referênciado
        .inTable('projects') // Qual tabela irá referênciar
        .onUpdate('CASCADE') // Quando houver alteração do ID do PROJECT na tabela PROJECT, também afeta a tabela TASKS
        .onDelete('CASCADE') // Se um projeto for deletado, a TASK também será
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      table.timestamp('due_date') // Data de finalização da tarefa
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
