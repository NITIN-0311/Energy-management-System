import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from "App/Models/User";
import Admin from 'App/Models/Admin';

import JwtService from 'App/Services/jwt_service';
import Hash from '@ioc:Adonis/Core/Hash'

export default class AuthController {

  public async registerUser({request,response}:HttpContextContract)
  {
    const userPayload = request.only(['email','password']);
    const createdUser= await User.create(userPayload);
    return response.created(createdUser);
  }

  public async registerAdmin({request,response}:HttpContextContract)
  {
    const adminPayload = request.only(['email','password']);
    const createdAdmin = await Admin.create(adminPayload);
    return response.created(createdAdmin);
  }

  /*
  public async login({request,auth}:HttpContextContract)
  {
    const {email,password} = request.only(['email','password'])
    const token = await auth.use('api').attempt(email,password);
    return token;
  }*/

public async userLogin({ request, response }: HttpContextContract) {

  const { email, password } = request.only(['email','password',])
  const user = await User.findBy('email', email)

  if (!user)
    return response.unauthorized({message: 'Invalid credentials'})

  if (!password)
      return response.badRequest({message: 'Password is required'})

  const isPasswordCorrect = await Hash.verify(user.password,password)

  if (!isPasswordCorrect)
    return response.unauthorized({message: 'Invalid credentials',})

  const token = JwtService.generateToken(user, 'user')

  return {token,user}
}

public async adminLogin({ request, response }: HttpContextContract) {

  const {email,password} = request.only(['email','password',])
  const admin = await Admin.findBy('email', email)

  if (!admin)
    return response.unauthorized({message: 'Invalid credentials', })

  const isPasswordCorrect = await Hash.verify(admin.password,password)

  if (!isPasswordCorrect)
    return response.unauthorized({message: 'Invalid credentials',})

  const token = JwtService.generateToken(admin, 'admin')
  return {token, admin}
  }
}
