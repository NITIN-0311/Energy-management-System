import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'electrical_assets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('building_id')
      table.string('asset_name',100)
      table.decimal('capacity_kw',10,2)
      table.integer('voltage_rating')
      table.string('status',50)
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
/*
  public id!: number;

  @column()
  public building_id!: number;

  @column()
  public asset_name!: string;

  @column()
  public capacity_kw!: number;

  @column()
  public voltage_rating!: number;

  @column()
  public status!: string

*/

