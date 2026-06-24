import Building from "App/Models/Building";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BuildingValidator, { ValidateFilterByArea, ValidateFilterById, ValidateFilterByType } from "App/Validators/BuildingValidator";


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
        })
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
          message:"internal server error occured",
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
  public async update({params,req,res}:HttpContext)
  {
    const user =
    return await Building.
  }
*/

}


//const data = request.only(['name','location','building_type','total_area_sqft','peak_load_kw']);

