import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class BuildingValidator {

  constructor(protected httpContext: HttpContextContract) {

    console.log(this.httpContext)
    /*
      implicitly returns the prototype of this class
      as object
      const obj = Object.create(BuildingValidator.prototype)
      BuildingValidator.constructor.call(obj, ctx)
      return obj
    */
  }

  /*
      Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
  */

  public schema = schema.create({
    name:schema.string({},[
      rules.alpha({allow:['space']}),
      //rules.camelCase()
    ]),
    location:schema.string({},
      [
        rules.minLength(3),
        rules.maxLength(150),
      ]
    ),

    building_type:schema.enum(['residential', 'commercial', 'industrial', 'warehouse'] as const),

    total_area_sqft:schema.number([
      rules.unsigned(),
      rules.range(1,1000000)
    ]),

    peak_load_kw:schema.number([
      rules.unsigned(),
      rules.range(0.1,500000)
    ]),
    created_at:schema.date.optional()
  })

  public messages: CustomMessages = {
  'name.required': 'Please enter the building name.',
  'name.alpha': 'The building name can only contain letters and spaces.',
  'building_type.enum': 'Please select a valid building type (residential, commercial, industrial, or warehouse).',
  'total_area_sqft.unsigned': 'Total area must be a positive number.',
  'peak_load_kw.range': 'Peak load must be between 0.1 and 50,000 kW.',
  }
}

  export class ValidateFilterById
  {
    public tempSchema = schema.create(
      {
          id:schema.number([
          rules.unsigned()
          ])
      }
    )
  }

  export class ValidateFilterByType
  {
    public tempSchema = schema.create({
        buildingType:schema.enum(['residential', 'commercial', 'industrial', 'warehouse'] as const),
      })
  }

  export class ValidateFilterByArea
  {
    public tempSchema = schema.create({
        totalAreaSqft:schema.number([
        rules.unsigned(),
        rules.range(1,1000000)
      ])
    })
  }

