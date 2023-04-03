const express = require("express");
const router = express.Router();
const validateInput = require("../helpers");
const recipeFunctions = require("../data/recipes");
const userFunctions = require("../data/users");
const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const redis = require("redis");

const client = redis.createClient();
client.connect();
const DEFAULT_EXPIRATION = 3600;

const changeInRecipe = async (recipeId, totalRecipesCount) => {
  let i = 1;
  try {
    while (true) {
      recipePage = await client.get(`Page_${i}`);
      if (recipePage === NaN || !recipePage || recipePage === null) {
        if (i <= totalRecipesCount / 10) {
          i += 1;
          continue;
        } else {
          return "No Page In Cache Yet. So No Worries!🥳";
        }
      } else if (recipePage.includes(recipeId)) {
        const d = await recipeFunctions.getAllRecipes(i, 50);
        await client.set(`Page_${i}`, JSON.stringify(d));
        return "Cache Succesfully Updated!";
      } else {
        i += 1;
      }
    }
  } catch (e) {
    e = new Error("Something Went Wrong!");
    e.status = 500;
    throw e;
  }
};

const newlyAddedRecipe = async (totalRecipesCount) => {
  let allPages = [];
  let i = 1;
  try {
    while (true) {
      recipePage = await client.get(`Page_${i}`);
      if (recipePage === NaN || !recipePage || recipePage === null) {
        if (i <= totalRecipesCount / 10) {
          i += 1;
          continue;
        } else {
          return allPages;
        }
      } else {
        allPages.push(i);
        i += 1;
      }
    }
  } catch (e) {
    console.log(e);
  }
  return allPages;
};

router
  .route("/")
  .get(async (req, res) => {
    try {
      if (req.query.page)
        if (isNaN(req.query.page) || req.query.page === "0") {
          throw "Invalid Input Error: The page number is not valid";
        }
    } catch (e) {
      return res.status(400).json({ message: e });
    }
    const page = req.query.page || 1;
    const recipesPerPage = 50;

    try {
      const d = await recipeFunctions.getAllRecipes(page, recipesPerPage);
      if (d.length === 0) {
        return res.status(404).json({ message: "No more recipes are found" });
      }
      await client.set(`Page_${page}`, JSON.stringify(d));
      res.status(200).json(d);
    } catch (e) {
      return res.status(500).json({ message: "Recipe Not Found!" });
    }
  })
  .post(async (req, res) => {
    try {
      req.body.title = validateInput.checkTitle(req.body.title);
      req.body.ingredients = validateInput.checkIngredients(
        req.body.ingredients
      );
      req.body.cookingSkillRequired = validateInput.checkCookingSkillRequired(
        req.body.cookingSkillRequired
      );
      req.body.steps = validateInput.checkSteps(req.body.steps);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const recipe = await recipeFunctions.createRecipe(
        req.body.title,
        req.body.ingredients,
        req.body.cookingSkillRequired,
        req.body.steps,
        req.session.user.username
      );
      const recipeIdForCache = recipe._id.toString().trim();
      await client.set(`${recipeIdForCache}`, JSON.stringify(recipe));
      await client.zIncrBy("recipe_leaderboard", 1, `${recipeIdForCache}`);
      //////////////////////////////////////////////////////////////////////////////////////
      const recipeCollection = await recipes();
      const totalRecipesCount = await recipeCollection.countDocuments();
      //////////////////////////////////////////////////////////////////////////////////////
      theChange = await newlyAddedRecipe(totalRecipesCount);

      for (let i = 0; i < theChange.length; i++) {
        d = await recipeFunctions.getAllRecipes(theChange[i], 50);
        try {
          await client.set(`Page_${theChange[i]}`, JSON.stringify(d));
        } catch (e) {
          console.log(e);
        }
      }
      //////////////////////////////////////////////////////////////////////////////////////
      res.status(200).json(recipe);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const d = await recipeFunctions.getRecipeById(req.params.id);
      await client.set(`${req.params.id.trim()}`, JSON.stringify(d));
      await client.zIncrBy("recipe_leaderboard", 1, `${req.params.id.trim()}`);
      res.status(200).json(d);
    } catch (e) {
      return res.status(e.status || 500).json({ error: "Recipe Not Found!" });
    }
  })
  .patch(async (req, res) => {
    try {
      req.params.id = validateInput.checkIdTwo(req.params.id);

      if (!req.body || req.body == null) {
        throw "Invalid Input Error: The Request Body is Empty";
      }
      if (
        !req.body.title &&
        !req.body.ingredients &&
        !req.body.cookingSkillRequired &&
        !req.body.steps
      ) {
        throw "Invalid Input Error: None of the required parameters are provided in the request body";
      }

      if (req.body.title)
        req.body.title = validateInput.checkTitle(req.body.title);
      if (req.body.ingredients)
        req.body.ingredients = validateInput.checkIngredients(
          req.body.ingredients
        );
      if (req.body.cookingSkillRequired)
        req.body.cookingSkillRequired = validateInput.checkCookingSkillRequired(
          req.body.cookingSkillRequired
        );
      if (req.body.steps)
        req.body.steps = validateInput.checkSteps(req.body.steps);
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const recipe = await recipeFunctions.EditRecipe(
        req.params.id,
        req.body.title,
        req.body.ingredients,
        req.body.cookingSkillRequired,
        req.body.steps,
        req.session.user.username
      );
      await client.set(`${req.params.id.trim()}`, JSON.stringify(recipe));
      let idForPatch = req.params.id;
      idForPatch = idForPatch.toString().trim();
      //////////////////////////////////////////////////////////////////////////////////////
      const recipeCollection = await recipes();
      const totalRecipesCount = await recipeCollection.countDocuments();
      //////////////////////////////////////////////////////////////////////////////////////
      const theChange = await changeInRecipe(idForPatch, totalRecipesCount);
      await client.zIncrBy("recipe_leaderboard", 1, `${idForPatch}`);
      res.status(200).json(recipe);
    } catch (e) {
      return res
        .status(e.status || 500)
        .json({ error: "Could Not EDIT Recipe" });
    }
  });

router.route("/:id/comments").post(async (req, res) => {
  try {
    req.params.id = await validateInput.checkIdTwo(req.params.id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    userThatCommented = await userFunctions.getUserByUsername(
      req.session.user.username
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    const comment = await recipeFunctions.addComment(
      req.params.id,
      userThatCommented,
      req.body.comment
    );
    await client.set(`${req.params.id.trim()}`, JSON.stringify(comment));
    //////////////////////////////////////////////////////////////////////////////////////
    const recipeCollection = await recipes();
    const totalRecipesCount = await recipeCollection.countDocuments();
    //////////////////////////////////////////////////////////////////////////////////////
    const theChange = await changeInRecipe(
      req.params.id.trim(),
      totalRecipesCount
    );
    await client.zIncrBy("recipe_leaderboard", 1, `${req.params.id.trim()}`);
    res.status(200).json(comment);
  } catch (e) {
    return res.status(e.status || 500).json({ error: "Could Not Add Comment" });
  }
});

router.route("/:recipeId/:commentId").delete(async (req, res) => {
  recipeId = req.params.recipeId;
  recipeId = validateInput.checkIdTwo(recipeId);

  commentId = req.params.commentId;
  commentId = validateInput.checkIdTwo(commentId);

  if (!recipeId) {
    return res.status(400).json({ error: "no valid id is given" });
  }

  if (!commentId) {
    return res.status(400).json({ error: "no valid id is given" });
  }

  try {
    recipeId = validateInput.checkIdTwo(recipeId);
    commentId = validateInput.checkIdTwo(commentId);

    if (req.session.user) {
      result = await recipeFunctions.removeComment(
        recipeId,
        commentId,
        req.session.user.username
      );
    } else {
      return res.status(403).json({ error: "Not logged in" });
    }

    await client.set(`${recipeId.trim()}`, JSON.stringify(result));
    //////////////////////////////////////////////////////////////////////////////////////
    const recipeCollection = await recipes();
    const totalRecipesCount = await recipeCollection.countDocuments();
    //////////////////////////////////////////////////////////////////////////////////////
    const theChange = await changeInRecipe(recipeId.trim(), totalRecipesCount);
    await client.zIncrBy("recipe_leaderboard", 1, `${recipeId.trim()}`);

    res.status(200).json(result);
  } catch (e) {
    return res
      .status(e.status || 500)
      .json({ error: "Could Not Delete Comment" });
  }
});

router.route("/:id/likes").post(async (req, res) => {
  try {
    req.params.id = validateInput.checkIdTwo(req.params.id);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const like = await recipeFunctions.likeRecipe(
      req.params.id,
      req.session.user.username
    );
    await client.set(`${req.params.id.trim()}`, JSON.stringify(like));
    await client.zIncrBy("recipe_leaderboard", 1, `${req.params.id.trim()}`);
    //////////////////////////////////////////////////////////////////////////////////////
    const recipeCollection = await recipes();
    const totalRecipesCount = await recipeCollection.countDocuments();
    //////////////////////////////////////////////////////////////////////////////////////
    const theChange = await changeInRecipe(
      req.params.id.trim(),
      totalRecipesCount
    );
    res.status(200).json(like);
  } catch (e) {
    return res.status(e.status || 500).json({ error: "Could Not Like Recipe" });
  }
});

module.exports = router;
