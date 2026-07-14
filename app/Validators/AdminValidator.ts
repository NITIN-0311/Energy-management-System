import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'admins', column: 'email' })
    ]),
    password: schema.string({}, [
      rules.minLength(8)
    ])
  })

  public messages: CustomMessages = {
    'email.required': 'Email is required',
    'email.email': 'Invalid email format',
    'email.unique': 'Email is already registered',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be at least 8 characters long'
  }
}
