import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'buildings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name',150).notNullable()
      table.text('location').notNullable()
      table.string('building_type',50);
      table.integer('total_area_sqft')
      table.decimal('peak_load_kw',10,2)
      table.timestamp('created_at').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
