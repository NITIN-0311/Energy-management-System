import Building from "App/Models/Building";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BuildingValidator, { ValidateFilterByArea, ValidateFilterById, ValidateFilterByType } from "App/Validators/BuildingValidator";
//import ElectricalAsset from 'App/Models/ElectricalAsset';

export default class BuildingsController {

    /*
    class HttpContext
    {
      request: Request
      response: Response
      auth: Auth
      session: Session
      logger: Logger
      params: any
      route: Route
    }
    */

    /*
    BuildingValidator
    │
    ├── httpContext
    ├── schema
    └── messages

    for each field in schema
        read field from request body
        check its type
        apply every rule
        Returns 422 Unprocessable entity status code in case of failure
    */

  private async validatePayload(request:HttpContextContract['request'])
  {
    return request.validate(BuildingValidator)
  }

  public async store({request,response}:HttpContextContract)
  {
    const payloadData = await this.validatePayload(request)

    try{
        const building= await Building.create(payloadData);
        return response.ok({data:building});
        }
    catch(error)
    {
        return response.internalServerError({
          message:"internal server error occured",
          error:error
        });
    }
  }

  public async fetchall({response}:HttpContextContract)
  {
    try
    {
      const buildings= await Building.all()
      return response.status(200).send({
          data:buildings,
          //status:200
        })
    }
    catch(error)
    {
      return response.status(500).send(
        {
          message:"internal server error occurred",
          error:error,
        })
    }
  }

  public async filter({request,response}:HttpContextContract)
  {
    const validatedPayloadId = await request.validate({
        schema: new ValidateFilterById().tempSchema,
        data:request.params()
      });

    try{
      const filteredBuildings = await Building.find(validatedPayloadId.id);

      if (!filteredBuildings)
        return response.notFound({
        message: "Building not found for the given Id"
      })
      return response.status(200).send({
        data: filteredBuildings,
        message:"request completed"
      })
    }

    catch(error){
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async fetchByType({request,response}:HttpContextContract)
  {
    const validatedPayloadType = await request.validate(
      {
        schema: new ValidateFilterByType().tempSchema,
        data:request.params()
      }
    )
    try
    {
      const filteredBuildings =await Building.findBy('building_type',validatedPayloadType.buildingType);
      return response.status(200).send(filteredBuildings)
    }
    catch(error){
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async fetchByArea({request,response}:HttpContextContract)
  {
    const validatedPayloadArea = await request.validate(
        {
        schema: new ValidateFilterByArea().tempSchema,
        data:request.params()
        }
      )

    try
    {
       const filteredBuildings= await Building.query().where('total_area_sqft','>',validatedPayloadArea.totalAreaSqft)//(<column name, value>)
       return response.status(200).send({
        data:filteredBuildings,
        message:"request completed"})
    }

    catch(error){
        return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
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

    const validatedPayloadId = await request.validate(
      {
        schema: new ValidateFilterById().tempSchema,
        data:request.params()
      })

    const validatedBodyPayload = await request.validate(BuildingValidator)

    try{
        let selectedBuildings = await Building.find(validatedPayloadId.id);
        if (!selectedBuildings) {
            return response.notFound({ message: 'Building not found' });
        }
    /*
    const updating_data:any={}
    for (const key of ['name','location','building_type','total_area_sqft','peak_load_kw'])
    {
      const value = request.input(key)
      if (value!=undefined)
      {
        updating_data[key]=value
      }
    }
    console.log(updating_data);
    */
        selectedBuildings.merge(validatedBodyPayload);
        await selectedBuildings.save();

        return response.ok({
          message: "Building updated successfully",
          data: selectedBuildings})
    }

    catch(error){
        return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async deleteByid({request,response}:HttpContextContract)
  {
    const validatedPayloadId= await request.validate(
      {
        schema: new ValidateFilterById().tempSchema,
        data:request.params()
      }
    )

    try{
    const deleted = await Building.query().where('id',validatedPayloadId.id).delete() as unknown as number

    if (deleted === 0)
      return response.notFound({ message: 'Building not found' })

    return response.ok({
      message: 'Building deleted successfully',
      deletedCount: deleted})
    }

    catch(error){
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }
/*
  public async getBuildingsWithAssets({response} :HttpContextContract) {
    try
    {
      const result = await Building
      .query()
      .join('electrical_assets', 'buildings.id', '=', 'electrical_assets.building_id')
      .select(
        'buildings.*',
        'electrical_assets.id as asset_id',
        'electrical_assets.asset_name',
        'electrical_assets.capacity_kw',
        'electrical_assets.voltage_rating',
        'electrical_assets.status',
        'electrical_assets.installed_at'
      )
    return response.status(200).send(
      {
        data:result,
        message:'Successfully retrieved assets data'
      }
    );
    }
      catch(error)
      {
        return response.status(500).send({
          message:"Internal server error",
          error:error
        })
      }
  }
*/
public async getBuildingsWithAssets({ response }: HttpContextContract) {
  console.log("Controller Hit - getBuildingsWithAssets");
  try {
    const rows = await Building
      .query()
      .join('electrical_assets', 'buildings.id', '=', 'electrical_assets.building_id')
      .select(
        'buildings.id as building_id',
        'buildings.name',
        'buildings.location',
        'buildings.building_type',
        'buildings.total_area_sqft',
        'buildings.peak_load_kw',

        'electrical_assets.id as asset_id',
        'electrical_assets.asset_name',
        'electrical_assets.capacity_kw',
        'electrical_assets.voltage_rating',
        'electrical_assets.status',
        'electrical_assets.installed_at'
      )

    const grouped = new Map<number, any>()

    for (const row of rows) {
      const buildingId = row.building_id

      if (!grouped.has(buildingId)) {
        grouped.set(buildingId, {
          id: buildingId,
          name: row.name,
          location: row.location,
          building_type: row.building_type,
          total_area_sqft: row.total_area_sqft,
          peak_load_kw: row.peak_load_kw,
          assets: []
        })
      }

      grouped.get(buildingId).assets.push({
        id: row.asset_id,
        asset_name: row.asset_name,
        capacity_kw: row.capacity_kw,
        voltage_rating: row.voltage_rating,
        status: row.status,
        installed_at: row.installed_at
      })
    }
    console.log(Array.from(grouped.values()));
    return response.ok({
      data: Array.from(grouped.values()),
      message: 'Successfully retrieved buildings with assets'
    })

  } catch (error) {
    console.log(error)
    return response.internalServerError({
      message: 'Internal server error',
      error
    })
  }
}
  /*
  public async update({params,req,res}:HttpContext)
  {
    const user =
    return await Building.
  }
*/

}


//const data = request.only(['name','location','building_type','total_area_sqft','peak_load_kw']);

