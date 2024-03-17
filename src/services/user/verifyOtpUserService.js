const otpModel = require("../../models/users/OTPModel");

const verifyOtpService = async (req) => {
  try {
    let email = req.params.email;
    let OTPCode = req.params.otp;

    let status = 0;
    let statusUpdate = 1;

    const matchStage = {
      $match: { email: email, otp: OTPCode, status: status },
    };
    let countStage = { $count: "total" };

    //First Process
    let OTPCount = await otpModel.aggregate([matchStage, countStage]);

    if (OTPCount.length > 0) {
      //Second Process
      let OTPUpdate = await otpModel.updateOne(
        { email: email, otp: OTPCode, status: status },
        {
          email: email,
          otp: OTPCode,
          status: statusUpdate,
        }
      );
      return { status: "success", data: OTPUpdate };
    } else {
      return { status: "fail", data: "Invalid OTP code" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = verifyOtpService;
