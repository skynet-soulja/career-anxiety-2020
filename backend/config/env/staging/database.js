const parse = require("pg-connection-string").parse;
const config = process.env.DATABASE_URL ? parse(process.env.DATABASE_URL) : {};

module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: config.host || "localhost",
        port: config.port || 5432,
        database: config.database || "strapi-staging",
        username: config.user || "strapi",
        password: config.password || "strapi",
        schema: env("DATABASE_SCHEMA", "public"), // Not Required
        ssl: {
          rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false), // For self-signed certificates
        },
      },
      options: {
        ssl: true,
      },
    },
  },
});
