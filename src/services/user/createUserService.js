const userModel = require("../../models/users/userModel");

const createUserService = async (req) => {
  try {
    let postBody = req.body;
    let data = await userModel.create(postBody);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = createUserService;
