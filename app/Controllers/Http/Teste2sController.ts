import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Teste2sController {
  public async index({}: HttpContextContract) {
    // const result = await Database.connection('oracledb')
    //   .query()
    //   .select('*')
    //   .from('v_ega_pecas')

    // return result
  }
}


