const mysql = require("mysql2/promise");

class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection(this.config);
      console.log("Database connected");
    } catch (err) {
      console.error("Connection error:", err.message);
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.close();
      console.log("Database disconnected");
    }
  }

  async query(query, params) {
    try {
      const [results] = await this.connection.query(query, params);
      return results;
    } catch (err) {
      console.error("Query error:", err.message);
      throw err;
    }
  }
}

module.exports = Database;
