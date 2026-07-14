import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Admin from 'App/Models/Admin'

/*
export default class extends BaseSeeder {
  public async run () {
      await User.query().delete()
      await Admin.query().delete()
      console.log("Credentials cleared")
  }
}*/

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
