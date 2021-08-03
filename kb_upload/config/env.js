const env = {
    database: 'uploads',
    username: 'kbdoc',
    password: 'thalya2020',
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  };
   
  module.exports = env;