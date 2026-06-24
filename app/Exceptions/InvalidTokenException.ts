import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InvalidTokenException extends Exception {
  public code = 'INVALID_TOKEN'
  public status = 401

  constructor(message: string = 'Invalid custom token provided') {
    super(message, 401, 'INVALID_TOKEN')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(this.status).send({
      status: false,
      code: this.code,
      message: this.message,
    })
  }
}
