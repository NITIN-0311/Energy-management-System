import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ElectricalAssetValidator {

  constructor(protected httpContext: HttpContextContract) {

  }

  public schema = schema.create({

    building_id: schema.number([
      rules.unsigned()
    ]),

    asset_name: schema.string({},[
      rules.minLength(3),
      rules.maxLength(150)
    ]),

    asset_type: schema.enum(['main_meter','sub_meter',
      'hvac','lighting','solar','ups', 'machinery'] as const),

    capacity_kw: schema.number([
      rules.unsigned(),
      rules.range(0.1,100000)
    ]),

    voltage_rating: schema.number([
      rules.unsigned(),
      rules.range(1,100000)
    ]),

    status: schema.enum([
      'active', 'inactive', 'faulty', 'maintenance'
    ] as const),

    installed_at: schema.date.optional()

  })

  public messages: CustomMessages = {

    'building_id.required':'Please enter the building id.',

    'asset_name.required':'Please enter asset name.',

    'asset_type.enum':'Please enter a valid asset type.',

    'capacity_kw.unsigned':'Capacity must be positive.',

    'voltage_rating.unsigned':'Voltage rating must be positive.',

    'status.enum':'Please enter a valid status.'

  }

}

export class ValidateFilterById
{
  public tempSchema = schema.create({
    id:schema.number([
      rules.unsigned()
    ])
  })
}

export class ValidateFilterByCapacity
{
  public tempSchema = schema.create({
    capacityKw:schema.number([
      rules.unsigned(),
      rules.range(0.1,100000)
    ])
  })
}

export class ValidateFilterByStatus
{
  public tempSchema = schema.create({
    status:schema.enum([
      'active',
      'inactive',
      'faulty',
      'maintenance'
    ] as const)
  })
}
