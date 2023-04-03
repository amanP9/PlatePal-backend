const express = require("express");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const redis = require("redis");
let RedisStore = require("connect-redis")(session);

const client = redis.createClient();
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
client.connect();
redisClient.connect().catch(console.error);
const DEFAULT_EXPIRATION = 3600;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    name: "AuthCookie",
    secret: "The Sun Will Rise Again",
    saveUninitialized: false,
    resave: false,
  })
);

app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  if (req.body) {
    console.log(`Request Body: ${JSON.stringify(req.body)}`);
  } else {
    console.log(`Request Body: {}`);
  }
  next();
});

const requestCounter = (function () {
  const counter = {};
  return function (req, res, next) {
    const url = req.originalUrl;
    if (!counter[url]) {
      counter[url] = 0;
    }
    counter[url]++;
    console.log(`Request Count - ${url}: ${counter[url]}`);
    next();
  };
})();

app.use(requestCounter);

app.use("/recipes", async (req, res, next) => {
  try {
    if (
      req.method === "GET" &&
      (req.originalUrl === "/recipes?page=1" ||
        req.originalUrl === "/recipes/" ||
        req.originalUrl === "/recipes")
    ) {
      // console.log("a get request");
      const page = req.query.page || 1;
      const allTheRecipes = await client.get(`Page_${page}`);
      if (allTheRecipes != null) {
        // console.log("Now cached");
        return res.status(200).json(JSON.parse(allTheRecipes));
      }
    } else if (
      req.method === "GET" &&
      req.originalUrl.startsWith("/recipes?page=")
    ) {
      // console.log("a get request");
      const page = req.query.page || 1;
      const allTheRecipes = await client.get(`Page_${page}`);
      if (allTheRecipes != null) {
        // console.log("Now cached");
        return res.status(200).json(JSON.parse(allTheRecipes));
      }
    } else if (
      req.method === "POST" &&
      (req.originalUrl === "/recipes" || req.originalUrl === "/recipes/")
    ) {
      // console.log("This newly created recipe will be cached");
    }
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
});

app.use("/recipes/:id", async (req, res, next) => {
  if (req.method === "POST" || req.method === "DELETE") {
    return next();
  }
  try {
    const decodedUrl = decodeURIComponent(req.originalUrl);
    req.originalUrl = decodeURIComponent(req.originalUrl);
    if (req.method === "GET" && req.originalUrl === decodedUrl) {
      const recipeById = await client.get(`${req.params.id.trim()}`);
      if (recipeById != null) {
        // console.log("Now cached");
        await client.zIncrBy(
          "recipe_leaderboard",
          1,
          `${req.params.id.trim()}`
        );
        return res.status(200).json(JSON.parse(recipeById));
      }
      next();
    } else if (req.method === "PATCH" && req.originalUrl === decodedUrl) {
      // console.log("For PATCH");
      next();
    }
  } catch (e) {
    // console.log(e);
    return res.status(500).json({ error: "Error Occured" });
  }
});

app.use("/login", (req, res, next) => {
  if (req.session.user) {
    return res
      .status(401)
      .json({ message: "Cannot Login: A user is already logged in" });
  }
  next();
});

app.use("/recipes", (req, res, next) => {
  if (["POST", "PUT", "PATCH"].includes(req.method) && !req.session.user) {
    return res
      .status(401)
      .json({ message: "You need to login to perform this action" });
  }
  next();
});

app.use("/recipes/:id/comments", (req, res, next) => {
  if (["POST", "DELETE"].includes(req.method) && !req.session.user) {
    return res
      .status(401)
      .json({ message: "You need to login to perform this action" });
  }
  next();
});

app.use((req, res, next) => {
  const isDeleteMethod = req.method === "DELETE";
  const userSessionExists = req.session && req.session.user;
  const recipeId = req.params && req.params.recipeId;
  const commentId = req.params && req.params.commentId;
  if (isDeleteMethod && !userSessionExists && recipeId && commentId) {
    return res
      .status(401)
      .json({ message: "You need to log in to perform this action" });
  }
  next();
});

app.use("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Cannot Logout: No user is logged in" });
  }
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
