import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION', 'pg'),

  connections: {
    pg: {
  client: 'pg',
  connection: {
    connectionString: Env.get('DATABASE_URL', ''),
    ssl: {
      rejectUnauthorized: false
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