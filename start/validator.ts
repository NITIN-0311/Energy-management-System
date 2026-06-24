/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
| Any code written inside this file will be executed during the application
| boot.
*/
import { validator } from '@ioc:Adonis/Core/Validator'
import { string } from '@ioc:Adonis/Core/Helpers'

validator.rule('camelCase',(value,_,options)=>
{
  if(typeof value!='string')
  {
    throw new Error(`${value} must be a string`)
  }

  if(value!= string.camelCase(value))
  {
    options.errorReporter.report(
      options.pointer,
      'camelCase',
      'camelCase validation failed',
      options.arrayExpressionPointer
    )
  }
  
})
