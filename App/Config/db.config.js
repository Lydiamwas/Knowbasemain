module.exports = {
    HOST: "localhost",
    USER: "kbdoc",
    PASSWORD: "thalya2020",
    DB: "knowledgebase",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };