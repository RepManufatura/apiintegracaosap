import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MaquinasController {
  public async Sopro({}: HttpContextContract) {
    const Maquinas = await Database.connection('mssql').query()
      .select('ID_Centro_Trabalho','Nome_Maquina','Nome_Grupo','Negócio','Nome_Setor')
      .from('Up_Centro_Trabalho')
      .where('Nome_Setor', '=', 'Wilmington')
      .where('Maquinas_Status', '=', 1)
      .where('Maquinas_Ativas', '=', 1)
      .where('Nome_Setor', '<>', 'Paulinia')
      .where('Nome_Setor', '<>', 'Maracanau')
      .where('Nome_Setor', '<>', 'Limeira')
      .where('Nome_Maquina', '<>', 'I750T')

    const MaquinasLigadas = await Database.connection('mssql').query()
      .select('*')
      .from('Vw_Equipamentos_Conn')
      .where('Nome_Setor', '=', 'Sopro')

    let Setor = Maquinas[0].Nome_Setor
    let TotalMaquinas = (MaquinasLigadas.length)
    let Ativas = 5
    let Paradas = 4
    console.log(MaquinasLigadas)

    const Dados = {
      Setor: Setor,
      TotalMaquinas:TotalMaquinas,
      Ativas: Ativas,
      Paradas: Paradas,
      Maquinas: Maquinas,
    }
    // const teste = Object.assign(Dados, Maquinas[0]);

    return Dados
  }
}
