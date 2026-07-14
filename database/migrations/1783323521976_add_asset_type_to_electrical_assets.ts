import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'electrical_assets'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('asset_type', 50)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('asset_type')
    })
  }
}
