import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomTokenService from 'App/Services/customToken_service'

export default class CustomAuth {
  constructor(private customTokenService: CustomTokenService) {}

  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    const requestToken = request.header('custom_token')

    this.customTokenService.validateToken(requestToken)

    // If validation passes, proceed to next middleware
    await next()
  }
}

