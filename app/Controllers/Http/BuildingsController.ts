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

  public async fetchall()
  {
    return await Building.all();
  }

  public async filter({request,response}:HttpContextContract)
  {
    const building_id = request.params().id;
    const building = await Building.find(building_id);
    return response.created(building)
  }

  public async fetchByType({request,response}:HttpContextContract)
  {
    const type= request.params().type;
    const building = await Building.findBy('building_type',type);
    return response.created(building)
  }

  public async fetchByArea({request,response}:HttpContextContract)
  {
    const area_value_from_url=request.params().total_area_sqft
    const buildings= await Building.query().where('total_area_sqft','>',area_value_from_url)//(<column name, value>)
    return response.created(buildings);
  }



  public async updateById({request,response}:HttpContextContract)
  {
    /*
    trash logic

    const id= request.params().id;
    let selected_buildings = await Building.find(id);

    if (!selected_buildings) {
      return response.notFound({ message: 'Building not found' });
    }
    const updating_data = request.only(['name','location','building_type','total_area_sqft','peak_load_kw']);
    selected_buildings.merge(updating_data);
    */

    const id= request.params().id;
    let selected_buildings = await Building.find(id);

    if (!selected_buildings) {
      return response.notFound({ message: 'Building not found' });
    }

    const updating_data:any={}
    for (const key of ['name','location','building_type','total_area_sqft','peak_load_kw'])
    {
      const value = request.input(key)
      if (value!=undefined)
      {
        updating_data[key]=value
      }
    }
   /*
    const updating_data = request.only([
    'name',
    'location',
    'building_type',
    'total_area_sqft',
    'peak_load_kw'
    ])*/

    console.log(updating_data);

    selected_buildings.merge(updating_data);
    await selected_buildings?.save();

  }

  public async deleteByid({request,response}:HttpContextContract)
  {
    const id=request.params().id
    const deleted = await Building.query().where('id',id).delete() as unknown as number

   if (deleted === 0) {
    return response.notFound({ message: 'Building not found' })
  }

  return response.ok({
    message: 'Building deleted successfully',
    deletedCount: deleted
  })
  }

  /*
  public async update({params,req,res}:HttpContext)
  {
    const user =
    return await Building.
  }
*/

}
