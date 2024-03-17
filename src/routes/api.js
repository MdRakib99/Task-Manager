const express = require("express");
const {
  registration,
  login,
  profileUpdate,
  profileDetails,
  recoverVerifyEmail,
  recoverVerifyOTP,
  recoverResetPass,
} = require("../controllers/users/userController");
const authVerifyMiddleware = require("../middleware/authVerifyMiddleware");
const {
  createTask,
  deleteTask,
  updateTask,
  taskList,
  taskStatusCount,
} = require("../controllers/task/taskController");

const router = express.Router();

//User Profile

router.post("/registration", registration);
router.post("/login", login);
router.post("/profileUpdate", authVerifyMiddleware, profileUpdate);
router.get("/profileDetails", authVerifyMiddleware, profileDetails);
router.get("/recoverVerifyEmail/:email", recoverVerifyEmail);
router.get("/recoverVerifyOTP/:email/:otp", recoverVerifyOTP);
router.post("/recoverResetPass", recoverResetPass);

//Task

router.post("/createTask", authVerifyMiddleware, createTask);
router.delete("/deleteTask/:id", authVerifyMiddleware, deleteTask);
router.get("/updateTask/:id/:status", authVerifyMiddleware, updateTask);
router.get("/taskList/:status", authVerifyMiddleware, taskList);
router.get("/taskStatusCount", authVerifyMiddleware, taskStatusCount);

module.exports = router;
