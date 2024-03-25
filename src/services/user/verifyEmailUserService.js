const otpModel = require("../../models/users/OTPModel");
const userModel = require("../../models/users/userModel");
const emailUtility = require("../../utility/emailUtility");

const verifyEmailService = async (req) => {
  try {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Check if the email exists
    const emailExists = await userModel.exists({ email: email });

    if (emailExists) {
      // OTP Inserts
      await otpModel.create({ email: email, otp: OTPCode });

      let emailText = `Your PIN Code is = ${OTPCode}`;
      console.log(emailText);
      let emailSubject = `Task Manager Mern PIN Verification`;
      let sendEmail = await emailUtility(email, emailText, emailSubject);

      return { status: "success", data: sendEmail };
    } else {
      return { status: "fail", data: "User Not Found" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = verifyEmailService;
