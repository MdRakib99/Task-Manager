const otpModel = require("../../models/users/OTPModel");
const userModel = require("../../models/users/userModel");

const resetPassService = async (req) => {
  let email = req.body["email"];
  let OTPCode = req.body["otp"];
  let newPassword = req.body["password"];
  let statusUpdate = 1;

  try {
    const matchStage = {
      $match: { email: email, otp: OTPCode, status: statusUpdate },
    };
    let countStage = { $count: "total" };
    //First Process
    let OtpUsedCount = await otpModel.aggregate([matchStage, countStage]);

    if (OtpUsedCount.length > 0) {
      //second Process
      let updatePassword = await userModel.updateOne(
        { email: email },
        { password: newPassword }
      );
      await otpModel.deleteOne({
        email: email,
        otp: OTPCode,
        status: statusUpdate,
      });

      return { status: "success", data: updatePassword };
    } else {
      return { status: "fail", data: "Invalid Request " };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = resetPassService;
