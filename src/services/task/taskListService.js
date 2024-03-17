const taskModel = require("../../models/task/taskModel");

const taskListService = async (req) => {
  try {
    let status = req.params.status;

    let email = req.headers["email"];
    let data = await taskModel.aggregate([
      { $match: { status: status, email: email } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createDate: {
            $dateToString: {
              date: "$createdAt",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error };
  }
};

module.exports = taskListService;
