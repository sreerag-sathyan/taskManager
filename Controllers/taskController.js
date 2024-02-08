const path = require("path");

const Task = require("../Model/Task");

const { catchAsync } = require("./ErrorController");
const { fail } = require("assert");

const getAllTasks = async (req, res, next) => {
  const tasks = await Task.find();

  if (tasks) {
    return res.status(200).json({ tasks: tasks });
  }
};

const addTask = catchAsync(async (req, res, next) => {
  const task = new Task(req.body);

  await task.save();

  res.status(201).redirect("/api/v1/tasks");
});

const getTask = catchAsync(async (req, res, next) => {
  console.log(req.params);

  const { id } = req.params;

  const task = await Task.findById(id);
  if (task) {
    return res.status(200).json({ task });
  }

  res.status(404).json({
    status: "fail",
    message: `id ${id} not found`,
  });
});

const updatetask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);

  console.log("id is ", id);

  const task = await Task.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: `id ${id} not found`,
    });
  }

  res.status(201).json({ task });
  res.redirect("/");
});

const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  console.log(req.body);

  const task = await Task.findByIdAndDelete(id, req.body);

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: `id ${id} not found`,
    });
  }

  res.status(200).json({ task });
};

module.exports = {
  getAllTasks,
  addTask,
  getTask,
  updatetask,
  deleteTask,
};
