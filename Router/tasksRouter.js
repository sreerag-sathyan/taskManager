const {getAllTasks,addTask,getTask,updatetask,deleteTask} = require('../Controllers/taskController')

const express = require('express')

const tasksRouter =  new express.Router()

tasksRouter.route('/').get(getAllTasks).post(addTask)

tasksRouter.route("/:id").get(getTask).patch(updatetask).delete(deleteTask);

module.exports = tasksRouter