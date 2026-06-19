import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Building extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public location!: string

  @column()
  public building_type?: string

  @column()
  public total_area_sqft?: number

  @column()
  public peak_load_kw?: number

  @column.dateTime({ autoCreate: true })
  public created_at!: DateTime
}

/*
CREATE TABLE buildings (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    location        TEXT NOT NULL, -- can later evolve into geo coordinates
    building_type   VARCHAR(50), -- office | mall | hospital | factory | warehouse
    total_area_sqft INT,
    peak_load_kw    DECIMAL(10,2),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

/*
Type script conventions
@column({ columnName: 'building_type' })
public buildingType?: string

@column({ columnName: 'total_area_sqft' })
public totalAreaSqft?: number

@column({ columnName: 'peak_load_kw' })
public peakLoadKw?: number
*/
