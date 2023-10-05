import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Up_Ordem_Produção extends BaseModel {
  public static table = 'Up_Ordem_Produção'
  public static primaryKey = 'ID_Ordem_Produção'

  @column({ columnName: 'ID_Centro_Trabalho' })
  public ID_Centro_Trabalho: number

  @column({ columnName: 'Raw_Data' })
  public Raw_Data: string

  @column({ columnName: 'Ordem_Produção' })
  public Ordem_Produção: number

  @column({ columnName: 'ID_Master_Ordem' })
  public ID_Master_Ordem: number

  @column({ columnName: 'Data_Inicio' })
  public Data_Inicio: Date

  @column({ columnName: 'Data_Fim' })
  public Data_Fim: Date

  @column({ columnName: 'RG_Material' })
  public RG_Material: number

  @column({ columnName: 'qtdeProduzir' })
  public qtdeProduzir: number

  @column({ columnName: 'qtdeRefugo' })
  public qtdeRefugo: number

  @column({ columnName: 'unidMedida' })
  public unidMedida: string

  @column({ columnName: 'Lote' })
  public Lote: number

  @column({ columnName: 'ControllerApi' })
  public ControllerApi: string


  public static get returning() {
    return ['ID_Centro_Trabalho', 'Raw_Data', 'Ordem_Produção', 'ID_Master_Ordem' , 'Data_Inicio' , 'Data_Fim', 'RG_Material', 'qtdeProduzir', 'qtdeRefugo', 'unidMedida', 'Lote', 'ControllerApi']
  }
}
