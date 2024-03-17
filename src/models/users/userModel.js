const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("users", dataSchema);

module.exports = userModel;
