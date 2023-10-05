import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MaquinasController {
  public async index({}: HttpContextContract) {
    const Maquinas = await Database.connection('mssql').query()
      .select('Nome_Dispositivo','Maquinas_Status')
      .from('Vw_Equipamentos_Conn')
    return Maquinas
  }
}
