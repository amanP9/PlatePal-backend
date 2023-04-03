const recipeRoutes = require("./recipes");
const userRoutes = require("./users");
const analyticsRoutes = require("./analytics");

const constructorMethod = (app) => {
  app.use("/recipes", recipeRoutes);
  app.use("/", userRoutes);
  app.use("/", analyticsRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
