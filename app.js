const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const { handleErrors } = require("./Controllers/ErrorController");

dotenv.config({ path: "./config.env" });

const app = express();

const main = async () => {
  mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};

main()
  .then((data) => console.log("Mongo server connected"))
  .catch(() => console.log("mongo server failed"));
const path = require("path");

const tasksRouter = require("./Router/tasksRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/v1/tasks", tasksRouter);

// app.get('/api/v1/tasks',getAllTasks)

app.use("*", (req, res, next) => {
  let err = new Error("Not found");

  next(err);
});

app.use(handleErrors);

app.listen(8000, () => {
  console.log("Express server started");
});
