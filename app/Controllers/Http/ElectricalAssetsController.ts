import ElectricalAsset from "App/Models/ElectricalAsset";
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ElectricalAssetValidator,{ValidateFilterByCapacity,ValidateFilterById,ValidateFilterByStatus} from "App/Validators/ElectricalAssetValidator";

export default class ElectricalAssetsController {

  private async validatePayload(request:HttpContextContract['request'])
  {
    return request.validate(ElectricalAssetValidator)
  }

  public async store({request,response}:HttpContextContract)
  {
    const payloadData = await this.validatePayload(request)

    try{
      const asset = await ElectricalAsset.create(payloadData)
      return response.created({ data:asset })
    }

    catch(error)
    {
      return response.internalServerError({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async fetchall({response}:HttpContextContract)
  {
    try
    {
      const assets = await ElectricalAsset.all()

      return response.status(200).send({data:assets})
    }

    catch(error)
    {
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async filter({request,response}:HttpContextContract)
  {
      const validatedPayloadId = await request.validate({

      schema:new ValidateFilterById().tempSchema,
      data:request.params()

    })

    try{

      const filteredAsset = await ElectricalAsset.find(validatedPayloadId.id)

      if(!filteredAsset)
        return response.notFound({message:"Electrical Asset not found for the given Id"})

      return response.status(200).send({
        data:filteredAsset,
        message:"request completed"
      })
    }

    catch(error)
    {
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async fetchByStatus({request,response}:HttpContextContract)
  {
    const validatedPayloadStatus = await request.validate({
      schema:new ValidateFilterByStatus().tempSchema,
      data:request.params()
    })

    try
    {
      const filteredAssets = await ElectricalAsset.query().where('status',validatedPayloadStatus.status)

      return response.status(200).send({
        data:filteredAssets,
        message:"request completed"
      })
    }

    catch(error)
    {
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async fetchByCapacity({request,response}:HttpContextContract)
  {
    const validatedPayloadCapacity = await request.validate({
      schema:new ValidateFilterByCapacity().tempSchema,
      data:request.params()

    })

    try
    {
      const filteredAssets = await ElectricalAsset.query().where('capacity_kw','>',validatedPayloadCapacity.capacityKw)

      return response.status(200).send({
        data:filteredAssets,
        message:"request completed"
      })
    }

    catch(error)
    {
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }
  }

  public async updateById({request,response}:HttpContextContract)
  {
    const validatedPayloadId = await request.validate({
      schema:new ValidateFilterById().tempSchema,
      data:request.params()
    })

    const validatedBodyPayload = await request.validate(ElectricalAssetValidator)
    try
    {
      let selectedAsset = await ElectricalAsset.find(validatedPayloadId.id)

      if(!selectedAsset)
      {
        return response.notFound({
          message:"Electrical Asset not found"
        })
      }

      selectedAsset.merge(validatedBodyPayload)

      await selectedAsset.save()

      return response.ok({
        message:"Electrical Asset updated successfully",
        data:selectedAsset
      })
    }

    catch(error)
    {
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }

  }

  public async deleteByid({request,response}:HttpContextContract)
  {
    const validatedPayloadId = await request.validate({

      schema:new ValidateFilterById().tempSchema,
      data:request.params()

    })

    try
    {
      const deleted = await ElectricalAsset.query().where('id',validatedPayloadId.id).delete() as unknown as number

      if(deleted===0)
      {
        return response.notFound({
          message:"Electrical Asset not found"
        })
      }

      return response.ok({
        message:"Electrical Asset deleted successfully",
        deletedCount:deleted
      })
    }

    catch(error)
    {
      return response.status(500).send({
        message:"Internal server error",
        error:error
      })
    }

  }

}

/*
building_id     INT NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    asset_name      VARCHAR(150) NOT NULL,
    asset_type      VARCHAR(50),   -- main_meter | sub_meter | hvac | lighting | solar | ups | machinery
    capacity_kw     DECIMAL(10,2),
    voltage_rating  DECIMAL(10,2),
    status          VARCHAR(20) DEFAULT 'active', -- active | inactive | faulty | maintenance

*/
