const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const companyRoute = require("./companyRoute");

module.exports = function root(app) {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/company", companyRoute);
};
