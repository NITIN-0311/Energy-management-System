import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JwtService from 'App/Services/jwt_service'


export default class AdminOrUser {

  public async handle({ request, response }: HttpContextContract,next: () => Promise<void>)
  {
    const jwt_token = request.header('jwt_token')
    if (!jwt_token)
      return response.unauthorized({message: 'jwt token missing'})

    const payload = JwtService.verifyToken(jwt_token)
    if (!payload)
      return response.unauthorized({message: 'Invalid or expired token'})

    if (payload.role !== 'admin' && payload.role !== 'user') {
      return response.forbidden({message: 'Access denied'})
    }
    (request as any).user = payload
    await next()
  }

}
