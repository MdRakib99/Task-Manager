const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String, required: true },
    status: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

const otpModel = mongoose.model("otps", dataSchema);

module.exports = otpModel;
