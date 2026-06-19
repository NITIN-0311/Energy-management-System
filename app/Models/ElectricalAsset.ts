import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ElectricalAsset extends BaseModel {
  @column({ isPrimary: true })
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

  /*
    note : dateTime({ autoCreate: true }) is optional
    But it is necessary if we are using date functions
    eg: toFormat()
  */
  @column.dateTime({ autoCreate: true })
  public installed_at!: DateTime
}

/*
CREATE TABLE electrical_assets (
    id              SERIAL PRIMARY KEY,
    building_id     INT NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    asset_name      VARCHAR(150) NOT NULL,
    asset_type      VARCHAR(50),   -- main_meter | sub_meter | hvac | lighting | solar | ups | machinery
    capacity_kw     DECIMAL(10,2),
    voltage_rating  DECIMAL(10,2),
    status          VARCHAR(20) DEFAULT 'active', -- active | inactive | faulty | maintenance
    installed_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
