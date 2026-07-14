import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'electrical_assets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('building_id').notNullable()
      table.string('asset_name',100).notNullable()
      table.decimal('capacity_kw',10,2).notNullable()
      table.integer('voltage_rating').notNullable()
      table.string('status',50).notNullable()
      table.timestamp('installed_at').defaultTo(this.raw('CURRENT_TIMESTAMP'))
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

