const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

module.exports = function root(app) {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
};
