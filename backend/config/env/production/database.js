module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("RDS_HOSTNAME", "localhost"),
        port: env.int("RDS_PORT", 5432),
        database: env("RDS_DB_NAME", "strapi-production"),
        username: env("RDS_USERNAME", "strapi"),
        password: env("RDS_PASSWORD", "strapi"),
        schema: env("DATABASE_SCHEMA", "public"), // Not Required
        ssl: {
          rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
        },
      },
      options: {
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  },
});
