/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvalidTokenException from './InvalidTokenException'
import MissingTokenException from './MissingTokenException'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    // Handle custom token exceptions
    if (error instanceof InvalidTokenException || error instanceof MissingTokenException) {
      return await error.handle(error, ctx)
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send({
        status: 'error',
        message: 'Validation failed',
        errors: error.messages.errors || error.messages
      })
    }

    return ctx.response.status(error.status || 500).send({
      status: 'error',
      message: error.message || 'Internal Server Error',
      code: error.code
    })
  }
}
