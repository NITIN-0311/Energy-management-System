import Env from '@ioc:Adonis/Core/Env'
import InvalidTokenException from 'App/Exceptions/InvalidTokenException'
import MissingTokenException from 'App/Exceptions/MissingTokenException'

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

    const expectedToken = Env.get('CUSTOM_TOKEN')

    if (expectedToken !== requestToken) {
      throw new InvalidTokenException('The provided custom token is invalid')
    }

    return true
  }

  public getToken(): string {
    return Env.get('CUSTOM_TOKEN')
  }
}
