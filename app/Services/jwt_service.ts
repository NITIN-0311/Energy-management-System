import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import Admin from 'App/Models/Admin'

export interface JwtPayload {
  id: number
  email: string
  role: 'user' | 'admin'
  iat: number
  exp: number
}

export default class JwtService {

  private static readonly privatekey=Env.get('JWT_SECRET_KEY')
  public static generateToken(lucidPayload: User | Admin,role: 'user' | 'admin'  ): string
  {
  const payload = {id: lucidPayload.id, email: lucidPayload.email, role }
  console.log('Generating JWT Token');
  //console.log('JWT_SECRET (generate):', Env.get('JWT_SECRET'))
  return jwt.sign(payload,this.privatekey,{expiresIn:'1h',})
  }

  public static verifyToken(token: string): JwtPayload | null {
    try
    {
      console.log('Verifying JWT Token')
      return jwt.verify(token,this.privatekey) as JwtPayload
    }

    catch (error)
    {
      console.log(error)
      return null
    }
  }
}
