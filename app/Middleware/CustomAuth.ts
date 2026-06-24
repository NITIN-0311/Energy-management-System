import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'


export default class CustomAuth {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {

    const customToken=Env.get('CUSTOM_TOKEN')
    const requestKey=request.header('custom_token');
    
    if(!requestKey)
        response.unauthorized({message:'Missing custom token'})

    else if (customToken!=requestKey)
        response.unauthorized({message:'Invalid custom token'})

    else
      await next()
  }
}
