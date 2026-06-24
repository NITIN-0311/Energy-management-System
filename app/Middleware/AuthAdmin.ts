import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JwtService from 'App/Services/jwt_service'

export default class AuthAdmin {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
 {
    const jwt_token = request.header('jwt_token')

    if (!jwt_token)
      return response.unauthorized({message: 'jwt token missing' })

/*
    if (!authHeader.startsWith('Bearer ')) {
      return response.unauthorized({
        message: 'Invalid Authorization header'
      })
    }
*/
   // const token = authHeader.replace('Bearer ', '').trim()

    const payload = JwtService.verifyToken(jwt_token)

    if (!payload)
    {
      return response.unauthorized({ message: 'Invalid or expired jw token'})
    }

    if (payload.role !== 'admin') {
      return response.forbidden({
        message: 'Only admin can access this resource'
      })
    }
    (request as any).user = payload
    await next()
  }
  }
}
