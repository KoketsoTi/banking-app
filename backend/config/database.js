module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'dpg-ceugh84gqg40d6hth8hg-a.oregon-postgres.render.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'banking_hop1'),
      user: env('DATABASE_USERNAME', 'admin'),
      password: env('DATABASE_PASSWORD', 'YOGzUIZNz2QlaPmsk37IvDQQE41Bpr0C'),
      ssl: env.bool('DATABASE_SSL', true),
    },
  },
});
