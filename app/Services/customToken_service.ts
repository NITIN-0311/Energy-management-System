import Env from '@ioc:Adonis/Core/Env'
import InvalidTokenException from 'App/Exceptions/InvalidTokenException'
import MissingTokenException from 'App/Exceptions/MissingTokenException'
import crypto from 'crypto'

export default class CustomTokenService {
  /**
   * @param requestToken
   * @throws
   * @throws
   * @returns
   */
  public validateToken(requestToken: string | undefined): boolean {
    // Check if token is provided
    if (!requestToken) {
      throw new MissingTokenException('Custom token is required in request header')
    }

    const parts = requestToken.split('.')
    if (parts.length !== 2) {
      throw new InvalidTokenException('The provided custom token is malformed')
    }

    const [payload, signature] = parts
    const secret = Env.get('CUSTOM_TOKEN')

    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

    if (expectedSignature !== signature) {
      throw new InvalidTokenException('The provided custom token signature is invalid')
    }

    return true
  }

  public getToken(payload: string = 'auth'): string {
    const secret = Env.get('CUSTOM_TOKEN')
    const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')
    return `${payload}.${signature}`
  }
}
