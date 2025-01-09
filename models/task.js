const DB = require("../database");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "task_manager",
};

const db = new DB(config);

class Task {
  static async add({ name, completed }) {
    const query = "INSERT INTO tasks (name, completed) VALUES (?, ?)";
    const values = [name, completed];

    await db.connect();
    const result = await db.query(query, values);
    await db.disconnect();

    return !!result;
  }

  static async get(id) {
    const query = "SELECT * FROM tasks WHERE id = ?";
    const values = [id];

    await db.connect();
    const result = await db.query(query, values);
    await db.disconnect();

    return result[0] || null;
  }

  static async getAll() {
    const query = "SELECT * FROM tasks";

    await db.connect();
    const result = await db.query(query);
    await db.disconnect();

    return result;
  }

  static async updateStatus({ id, completed }) {
    const query = "UPDATE tasks SET completed = ? WHERE id = ?";
    const values = [completed, id];

    await db.connect();
    const result = await db.query(query, values);
    await db.disconnect();

    return !!result;
  }

  static async remove(id) {
    const query = "DELETE FROM tasks WHERE id = ?";
    const values = [id];

    await db.connect();
    const result = await db.query(query, values);
    await db.disconnect();

    return result;
  }
}

module.exports = Task;

