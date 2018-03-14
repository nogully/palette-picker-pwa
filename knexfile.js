module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/swatches',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};