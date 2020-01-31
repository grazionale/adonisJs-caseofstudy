'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')
Route.get('/files/', 'FileController.index')
Route.get('/files/:id', 'FileController.show')

/**
 * Agrupa as rotas que precisam passar por determinado middleware
 */
Route.group(() => {
  Route.post('files', 'FileController.store')
  /**
   * Projects - Utilizando resoucer, é possível mapear todas as rotas
   * automaticamente
   */
  Route.resource('projects', 'ProjectController').apiOnly().validator(new Map(
    [
      [
        ['projects.store'], ['Project'] // nome do método que será validado, nome do validator
      ]
    ]
  ))
  /**
   * Tasks
   * Ao utilizar projects.tasks estamos criando rotas /projects/tasks, entre
   * outras similares.
   * Forçando que sempre que formos trabalhar com task, antes precisamos
   * saber qual projeto está relacionado, ou seja, task sempre precisa de um
   * pai project
   */
  Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map(
    [
      [
        ['projects.tasks.store'], ['Task'] // nome do método que será validado, nome do validator
      ]
    ]
  ))
}).middleware(['auth'])
