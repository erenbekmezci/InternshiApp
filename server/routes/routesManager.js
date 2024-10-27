const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const companyRoute = require("./companyRoute");
const advertRoute = require("./advertRoute");
const applicationRoute = require("./applicationRoute");
const postRoute = require("./postRoute");

module.exports = function root(app) {
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/company", companyRoute);
  app.use("/adverts", advertRoute);
  app.use("/applications", applicationRoute);
  app.use("/posts", postRoute);
};
