import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ElectricalAsset from 'App/Models/ElectricalAsset';

export default class ElectricalAssetsController {
  async show()
  {
    return ElectricalAsset.all();
  }

  async store({request,response}:HttpContextContract)
  {
    const data = request.only(['asset_name','asset_type','capacity_kw','voltage_rating','status'])
    const assets=ElectricalAsset.create(data) // instance of model class
    return response.created(assets);// generates a http response
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
