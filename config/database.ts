import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'pg'),

  connections: {
    pg: {
      client: 'pg',
      connection: {
        host: Env.get('PG_HOST'),
        port: Number(Env.get('PG_PORT', '5432')),
        user: Env.get('PG_USER'),
        password: Env.get('PG_PASSWORD', ''),
        database: Env.get('PG_DB_NAME'),
        ssl: {
          rejectUnauthorized: false,
        },
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

export default databaseConfig