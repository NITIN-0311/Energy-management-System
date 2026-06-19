//import { HttpContext } from "@adonisjs/core/build/standalone";
import Building from "App/Models/Building";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class BuildingsController {

  async payloadValidator()
  {
  }
  public async store({request,response}:HttpContextContract)
  {
    //whitelisting concept for better security
    const data = request.only(['name','location','building_type','total_area_sqft','peak_load_kw']);
    const building= await Building.create(data);
    return response.created(building);
  }

  public async list()
  {
    return await Building.all();
  }
/*
  public async update({params,req,res}:HttpContext)
  {
    const user =
    return await Building.
  }
*/

}
