const express = require("express");
const cors = require("cors");
const DB = require("./database");
const handlebars = require("express-handlebars");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "task_manager",
};

const app = express();
const db = new DB(dbConfig);

app.use(cors());
app.use(express.json());

app.set("view engine", "handlebars");
app.engine(
  "handlebars",
  handlebars.engine({
    layoutsDir: `./views/layouts`,
    partialsDir: `./views/partials`,
    defaultLayout: "index",
  })
);

const taskRouter = require("./routes/tasks");
const Task = require("./models/task");
app.use("/api/tasks", taskRouter);
app.use(
  "/bootstrap",
  express.static(__dirname + "/node_modules/bootstrap/dist")
);

app.get("/", async (req, res) => {
  const cols = ["ID", "Name", "Completed", ""];
  const tasks = await Task.getAll();

  res.render("main", { cols, tasks });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
