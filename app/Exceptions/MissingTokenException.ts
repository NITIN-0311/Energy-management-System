import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MissingTokenException extends Exception {
  public code = 'MISSING_TOKEN'
  public status = 401

  constructor(message: string = 'Custom token is required') {
    super(message, 401, 'MISSING_TOKEN')
  }

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(this.status).send({
      status: false,
      code: this.code,
      message: this.message,
    })
  }
}
