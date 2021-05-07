const mysql = require("serverless-mysql");

// Database class will promisify mysql query it will save us from callback hell
class Database {
  constructor(config) {
    this.connection = mysql({ config });
  }
  query(query, args) {
    return new Promise(async (resolve, reject) => {
      try {
        const results = await this.connection.query(query, args);
        await this.connection.end();
        if (results) {
          resolve(results);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}
const dbConnector = new Database({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "feedback",
  port: 3306,
});
module.exports = dbConnector;

// Database Name : feedback

// CREATE TABLE `feedback`.`feedback_data` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `user_name` VARCHAR(45) NOT NULL,
//   `feedback` VARCHAR(110) NULL,
//   `timestamp` VARCHAR(45) NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
//   PRIMARY KEY (`id`));
