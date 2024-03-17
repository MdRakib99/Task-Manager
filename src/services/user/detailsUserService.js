const userModel = require("../../models/users/userModel");

const detailsUserService = async (req) => {
  try {
    let email = req.headers["email"];
    let matchStage = {
      $match: { email: email },
    };
    let projectStage = {
      $project: {
        _id: 1,
        email: 1,
        firstName: 1,
        lastName: 1,
        mobile: 1,
        photo: 1,
        password: 1,
      },
    };
    let data = await userModel.aggregate([matchStage, projectStage]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = detailsUserService;
