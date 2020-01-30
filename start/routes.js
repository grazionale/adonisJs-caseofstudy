'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
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
  Route.resource('projects', 'ProjectController').apiOnly()
}).middleware(['auth'])
