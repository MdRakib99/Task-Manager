const taskModel = require("../../models/task/taskModel");

const taskStatusCountService = async (req) => {
  try {
    let email = req.headers["email"];
    let data = await taskModel.aggregate([
      { $match: { email: email } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = taskStatusCountService;
