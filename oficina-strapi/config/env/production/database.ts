// path: ./oficina-strapi/config/env/production/database.ts
import { parse } from 'pg-connection-string';

export default ({ env }) => {
  // Render proveerá la variable de entorno DATABASE_URL
  const config = parse(env('DATABASE_URL')); 
  
  return {
    connection: {
      client: 'postgres',
      connection: {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
        password: config.password,
        ssl: {
          // Para Render, a menudo necesitas permitir certificados autofirmados o configuraciones específicas de SSL.
          // 'rejectUnauthorized: false' es una configuración común, pero revisa la documentación de Render si tienes problemas.
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false), 
        },
      },
      debug: false,
    },
  }
};