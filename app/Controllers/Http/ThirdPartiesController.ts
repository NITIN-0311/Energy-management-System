import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ThirdPartiesController {

  public async accessThirdParty({response}:HttpContextContract)
  {

    const url='http://127.0.0.1:4000/accessthirdparty'

    try{
    const apiResponse = await fetch(url,
      {
        method:'GET',
        headers:{
          'thirdpartytoken' : 'LetMeIn'
        }
      }
    )
    const thirdPartyData =await apiResponse.json()
    return response.ok({'third party data':thirdPartyData})

    }

    catch(thirdPartyError)
    {
      console.log("cant access third party : ",thirdPartyError)
      return response.badGateway({
        message:"could'nt access third party",
        error:thirdPartyError
      })
    }
  }
}
