const mongoCollections = require("../config/mongoCollections");
const validateInput = require("../helpers");
const recipes = mongoCollections.recipes;
const { ObjectId } = require("mongodb");
const userFunctions = require("./users");

const createRecipe = async (
  title,
  ingredients,
  cookingSkillRequired,
  steps,
  userThatCreated
) => {
  const recipeCollection = await recipes();

  title = validateInput.checkTitle(title);
  ingredients = validateInput.checkIngredients(ingredients);
  cookingSkillRequired =
    validateInput.checkCookingSkillRequired(cookingSkillRequired);
  steps = validateInput.checkSteps(steps);

  const theUser = await userFunctions.getUserByUsername(userThatCreated);

  let userThatPosted = {
    _id: ObjectId(theUser._id),
    username: theUser.username,
  };

  const newRecipeInfo = {
    title: title,
    ingredients: ingredients,
    cookingSkillRequired: cookingSkillRequired,
    steps: steps,
    userThatPosted: userThatPosted,
    comments: [],
    likes: [],
  };

  const insertInfo = await recipeCollection.insertOne(newRecipeInfo);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add Recipe";
  }

  const newId = insertInfo.insertedId.toString();

  const newRecipe = await getRecipeById(newId);

  return await newRecipe;
};

const getAllRecipes = async (page, recipesPerPage) => {
  const recipeCollection = await recipes();
  page -= 1;
  const recipesList = await recipeCollection
    .find({})
    .skip(page * recipesPerPage)
    .limit(recipesPerPage)
    .toArray();
  if (!recipesList) throw "Could not get all recipes";
  return await recipesList;
};

const getRecipeById = async (recipeId) => {
  recipeId = validateInput.checkIdTwo(recipeId);
  const recipeCollection = await recipes();
  try {
    theRecipe = await recipeCollection.findOne({ _id: ObjectId(recipeId) });
  } catch (e) {
    e = new Error("Recipe You Are Trying To View Does Not Exist");
    e.status = 404;
    throw e;
  }

  if (theRecipe === null || !theRecipe) {
    const e = new Error("No Recipe found with that id");
    e.status = 404;
    throw e;
  }
  return await theRecipe;
};

const EditRecipe = async (
  recipeId,
  title,
  ingredients,
  cookingSkillRequired,
  steps,
  usernameOfEditor
) => {
  const recipeCollection = await recipes();
  const updatedRecipe = {};
  if (title) updatedRecipe.title = title;
  if (ingredients) updatedRecipe.ingredients = ingredients;
  if (cookingSkillRequired)
    updatedRecipe.cookingSkillRequired = cookingSkillRequired;
  if (steps) updatedRecipe.steps = steps;

  try {
    theRecipeToBeEdited = await getRecipeById(recipeId);
  } catch (e) {
    e = new Error("Recipe You Are Trying To Edit Does Not Exist");
    e.status = 404;
    throw e;
  }
  try {
    if (theRecipeToBeEdited.userThatPosted.username !== usernameOfEditor) {
      const e = new Error("You are Not Authorized To EDIT This Recipe!");
      e.status = 403;
      throw e;
    }

    let editionScore = 0;

    if (title) {
      if (theRecipeToBeEdited.title !== title) {
        editionScore += 1;
      }
    }

    if (ingredients) {
      if (
        JSON.stringify(theRecipeToBeEdited.ingredients) !==
        JSON.stringify(ingredients)
      ) {
        editionScore += 1;
      }
    }

    if (cookingSkillRequired) {
      if (theRecipeToBeEdited.cookingSkillRequired !== cookingSkillRequired) {
        editionScore += 1;
      }
    }

    if (steps) {
      if (JSON.stringify(theRecipeToBeEdited.steps) !== JSON.stringify(steps)) {
        editionScore += 1;
      }
    }

    if (editionScore == 0) {
      const e = new Error("No New Change Made In The Recipe!");
      e.status = 400;
      throw e;
    }

    const updatedInfo = await recipeCollection.updateOne(
      { _id: ObjectId(recipeId) },
      { $set: updatedRecipe }
    );
    if (!updatedInfo.acknowledged) throw "Could Not Update Recipe";

    return await getRecipeById(recipeId);
  } catch (e) {
    throw e;
  }
};

const addComment = async (recipeId, userThatIsLoggedIn, comment) => {
  const recipeCollection = await recipes();

  const newCommentInfo = {
    _id: new ObjectId(),
    userThatPostedComment: {
      _id: ObjectId(userThatIsLoggedIn._id),
      username: userThatIsLoggedIn.username,
    },
    comment: comment,
  };

  try {
    await recipeCollection.updateOne(
      {
        _id: ObjectId(recipeId),
      },
      {
        $push: {
          comments: newCommentInfo,
        },
      }
    );
  } catch (e) {
    e = new Error("Could Not Add Comment");
    e.status = 404;
    throw e;
  }

  const theRecipe = await getRecipeById(recipeId);

  return theRecipe;
};

const removeComment = async (recipeId, commentId, userThatWantsToDelete) => {
  const recipeCollection = await recipes();

  const theRecipe = await getRecipeById(recipeId);
  const allComments = theRecipe.comments;
  let theComment;

  let commentRemoved = [];

  for (let i = 0; i < allComments.length; i++) {
    if (allComments[i]._id.toString() === commentId) {
      theComment = allComments[i];
    } else {
      continue;
    }
  }

  if (!theComment) {
    const e = new Error("Comment You Are Trying To DELETE Does Not Exist");
    e.status = 404;
    throw e;
  }

  if (theComment.userThatPostedComment.username !== userThatWantsToDelete) {
    const e = new Error("You Are Not Authorized To DELETE This Comment");
    e.status = 403;
    throw e;
  }

  for (let i = 0; i < allComments.length; i++) {
    if (allComments[i]._id.toString() === commentId) {
      continue;
    } else {
      commentRemoved.push(allComments[i]);
    }
  }

  await recipeCollection.updateOne(
    { _id: ObjectId(theRecipe._id) },
    {
      $set: {
        comments: commentRemoved,
      },
    }
  );

  const updatedRecipe = await getRecipeById(theRecipe._id);

  return await updatedRecipe;
};

const likeRecipe = async (recipeId, userThatLiked) => {
  const recipeCollection = await recipes();
  try {
    theRecipe = await getRecipeById(recipeId);
  } catch (e) {
    e = new Error("No Recipe With This Id is found");
    e.status = 404;
    throw e;
  }

  let theUser = await userFunctions.getUserByUsername(userThatLiked);

  let theUserId = theUser._id.toString();

  const existingLikes = await theRecipe.likes;
  let newLikes;

  if (existingLikes.includes(theUserId)) {
    newLikes = existingLikes.filter((element) => element !== theUserId);
  } else {
    if (existingLikes.length < 1) {
      newLikes = [theUserId];
    } else {
      newLikes = [...existingLikes, theUserId];
    }
  }

  await recipeCollection.updateOne(
    { _id: ObjectId(theRecipe._id) },
    {
      $set: {
        likes: newLikes,
      },
    }
  );

  const updatedLikesRecipe = await getRecipeById(recipeId);
  return updatedLikesRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  addComment,
  removeComment,
  likeRecipe,
  EditRecipe,
};
