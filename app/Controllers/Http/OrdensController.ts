import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from '@ioc:Adonis/Lucid/Database'

import Up_Ordem_Produção from 'App/Models/Ordem'

export default class OrdensController {
  public async index({}: HttpContextContract) {
    return 'all users'
  }

  public async store({ request }: HttpContextContract) {
    try {
      const OrdemAll = request.all()[0]
      let NumeroDaOrdemdeProdução = OrdemAll.numeroOrdem
      let BuscaOrdem = await Database.connection('mssql')
        .query()
        .select('*')
        .from('Up_Ordem_Produção')
        .where('Ordem_Produção', '=', NumeroDaOrdemdeProdução)

      if (BuscaOrdem.length != 0) {
        let UpdateRespose
        let Master = BuscaOrdem[0].ID_Master_Ordem
        if (Master === 212) {
          let Raw = JSON.stringify([OrdemAll])



          let IDCentroDeTrabalho = (
            await Database.connection('mssql')
              .query()
              .select('*')
              .from('Up_Centro_Trabalho')
              .where('Nome_Maquina', '=', OrdemAll.centroDeTrabalho)
          )[0].ID_Centro_Trabalho

          let DeleteOrdensAntigas = (
            await Database.connection('mssql')
            .from('Up_Ordem_Produção')
            .where('Ordem_Produção',  NumeroDaOrdemdeProdução)
            .delete()
          )

          const InserirOrdemDeProdução = await Up_Ordem_Produção.create({
            ID_Centro_Trabalho: IDCentroDeTrabalho,
            ID_Master_Ordem: 212,
            Raw_Data: OrdemAll,
            Ordem_Produção: NumeroDaOrdemdeProdução,
            Data_Inicio: OrdemAll.inicio,
            Data_Fim: OrdemAll.fim,
            RG_Material: OrdemAll.rgMaterial,
            qtdeProduzir: OrdemAll.qtdeProduzir,
            qtdeRefugo: OrdemAll.qtdeRefugo,
            unidMedida: OrdemAll.unidMedida,
            Lote: OrdemAll.lote,
            ControllerApi: 'UPDATE',
          })

          await InserirOrdemDeProdução.save()

          UpdateRespose = {
            status: 2051,
            timestamp: '',
            type: 'Falha',
            title: 'Fila de integração',
            detail: `Ordem de Produção ${NumeroDaOrdemdeProdução} Cadastrada anteriormente, Ordem Atualizada`,
            userMessage: '',
            objects: {
              name: '',
              userMessage: '',
            },
          }
        } else {
          UpdateRespose = {
            status: 201,
            timestamp: '',
            type: 'Falha',
            title: 'Fila de integração',
            detail: `Ordem de Produção ${NumeroDaOrdemdeProdução} Cadastrada anteriormente, Status Bloquado`,
            userMessage: '',
            objects: {
              name: '',
              userMessage: '',
            },
          }
        }

        return UpdateRespose
      } else {
        let NomeCentroDeTrabalho = OrdemAll.centroDeTrabalho

        try {
          let IDCentroDeTrabalho = (
            await Database.connection('mssql')
              .query()
              .select('*')
              .from('Up_Centro_Trabalho')
              .where('Nome_Maquina', '=', NomeCentroDeTrabalho)
          )[0].ID_Centro_Trabalho

          const InserirOrdemDeProdução = await Up_Ordem_Produção.create({
            ID_Centro_Trabalho: IDCentroDeTrabalho,
            ID_Master_Ordem: 212,
            Raw_Data: OrdemAll,
            Ordem_Produção: NumeroDaOrdemdeProdução,
            Data_Inicio: OrdemAll.inicio,
            Data_Fim: OrdemAll.fim,
            RG_Material: OrdemAll.rgMaterial,
            qtdeProduzir: OrdemAll.qtdeProduzir,
            qtdeRefugo: OrdemAll.qtdeRefugo,
            unidMedida: OrdemAll.unidMedida,
            Lote: OrdemAll.lote,
            ControllerApi: 'INSERT',
          })

          await InserirOrdemDeProdução.save()

          let Resposta = {
            status: 201,
            timestamp: '',
            type: 'Sucesso',
            title: 'Fila de integração',
            detail: `Ordem de Produção ${NumeroDaOrdemdeProdução} incluída com sucesso`,
            userMessage: '',
            objects: {
              name: '',
              userMessage: '',
            },
          }

          return Resposta
        } catch (error) {
          let InserirNovoCentro = await Database.table('Up_Centro_Trabalho').insert({
            Nome_Maquina: OrdemAll.centroDeTrabalho,
            CentroTrabalho: OrdemAll.centro,
          })

          await InserirNovoCentro

          let IDCentroDeTrabalho = (
            await Database.connection('mssql')

              .query()
              .select('*')
              .from('Up_Centro_Trabalho')
              .where('Nome_Maquina', '=', NomeCentroDeTrabalho)
          )[0].ID_Centro_Trabalho

          const InserirOrdemDeProdução = await Up_Ordem_Produção.create({
            ID_Centro_Trabalho: IDCentroDeTrabalho,
            ID_Master_Ordem: 212,
            Raw_Data: OrdemAll,
            Ordem_Produção: NumeroDaOrdemdeProdução,
            Data_Inicio: OrdemAll.inicio,
            Data_Fim: OrdemAll.fim,
            RG_Material: OrdemAll.rgMaterial,
            qtdeProduzir: OrdemAll.qtdeProduzir,
            qtdeRefugo: OrdemAll.qtdeRefugo,
            unidMedida: OrdemAll.unidMedida,
            Lote: OrdemAll.lote,
            ControllerApi: 'NOVOCENTRO',
          })

          await InserirOrdemDeProdução.save()

          let ErroResposta = {
            status: 201,
            timestamp: '',
            type: 'Falha',
            title: 'Fila de integração',
            detail: `Centro de Trabalho ${NomeCentroDeTrabalho} não Cadastrado Anteriormente, Efetuado o Cadastro`,
            userMessage: '',
            objects: {
              name: '',
              userMessage: '',
            },
          }

          return ErroResposta
        }
      }
    } catch (error) {
      let ErrorResponse = {
        status: 400,

        timestamp: '',
        type: 'Falhsa',
        title: 'Erro Na Fila de integração',
        detail: `Houve um Erro na Integração ${error} Foi encontrado Durante a Execução`,
        userMessage: '',
        objects: {
          name: '',
          userMessage: '',
        },
      }

      return ErrorResponse
    }
  }
}
