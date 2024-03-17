const taskModel = require("../../models/task/taskModel");
const createService = require("../../services/common/createService");
const deleteService = require("../../services/common/deleteService");
const updateService = require("../../services/common/updateService");
const taskListService = require("../../services/task/taskListService");
const taskStatusCountService = require("../../services/task/taskStatusCountService");

exports.createTask = async (req, res) => {
  let result = await createService(req, taskModel);

  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
};

exports.deleteTask = async (req, res) => {
  let result = await deleteService(req, taskModel);

  res.status(200).json(result);
};
exports.updateTask = async (req, res) => {
  let result = await updateService(req, taskModel);

  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
};

exports.taskList = async (req, res) => {
  let result = await taskListService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
};
exports.taskStatusCount = async (req, res) => {
  let result = await taskStatusCountService(req);
  if (result.status === "success") {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
};
