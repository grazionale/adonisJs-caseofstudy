'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Youch = use('Youch')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    /**
     * Valida somente erros de exceção
     */
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    /**
     * Se o erro acontecer em ambiente de DEV, então, utiliza-se o youch
     * para formatar o erro e trazer mais inforamções pertinente a ele
     */
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    /**
     * Se não for erro de validação e se for em PRODUÇÃO, apenas retorna o
     * status do erro e não deixa o usuário final saber o que é
     */
    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} console.error();

   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
    console.log(error)
  }
}

module.exports = ExceptionHandler
