const express = require("express");
const router = express.Router();
const redis = require("redis");

const client = redis.createClient();
client.connect();
const DEFAULT_EXPIRATION = 3600;

router.route("/mostaccessed").get(async (req, res) => {
  try {
    topTenRecipes = await client.zRangeByScoreWithScores(
      "recipe_leaderboard",
      0,
      999999,
      "rev"
    );

    let recipeData = [];
    const leaderboardExists = await client.exists("recipe_leaderboard");

    if (leaderboardExists) {
      if (topTenRecipes.length != null || topTenRecipes.length >= 1) {
        if (topTenRecipes.length < 10) {
          for (let i = 0; i < topTenRecipes.length; i += 1) {
            let recipeId = topTenRecipes[i].value;
            let score = topTenRecipes[i].score;
            let recipe = await client.get(recipeId);
            recipeData.push({
              ...JSON.parse(recipe),
              score: score,
            });
          }
        } else {
          for (
            let i = topTenRecipes.length - 1;
            i >= topTenRecipes.length - 10;
            i -= 1
          ) {
            let recipeId = topTenRecipes[i].value;
            let score = topTenRecipes[i].score;
            let recipe = await client.get(recipeId);
            recipeData.push({
              ...JSON.parse(recipe),
              score: score,
            });
          }
        }
        recipeData.sort((a, b) => b.score - a.score);
        return res.status(200).json(recipeData);
      } else {
        res.status(204).json({ message: "Recipe Leaderboard Is Empty" });
      }
    } else {
      res.status(204).json({ message: "Recipe Leaderboard Is Empty" });
    }
  } catch (e) {
    return res
      .status(e.status || 500)
      .json({ error: "Could Not Get Most Accessed Recipes" });
  }
});

module.exports = router;
