const app = require("./app");

const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
  console.log("Backend Running");
});
