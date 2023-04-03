const mongoCollections = require("../config/mongoCollections");
const { ObjectId } = require("mongodb");
const validateInput = require("../helpers");
const recipes = mongoCollections.recipes;
const users = mongoCollections.users
const bcrypt = require('bcryptjs')
const saltRounds = 10


const createUser = async (
    name,
    username,
    password
  ) => { 
  name = validateInput.checkReviewerName(name)
  username = validateInput.checkUsername(username).toLowerCase()
  password = validateInput.checkPassword(password)
  
  const usersCollection = await users()
  const usernameCheck = await usersCollection.findOne({username: username})
  
    if(usernameCheck){
      // console.log("Username Already Taken...")
      throw "There Is Already A User With That Username"
    }
   
  const hashedPassword = await bcrypt.hash(password,saltRounds)
  //Find Ways to replace text using handlebars
  
  // return hashedPassword
  
  const newUserInfo = {
    name: name,
    username: username,
    password: hashedPassword //I know we have to do something with the password
  }
  
  const insertInfo = await usersCollection.insertOne(newUserInfo);
  
  if(!insertInfo.acknowledged || !insertInfo.insertedId){
    throw "Error: Could Not Add User or Could Not Create Account"   //See if this statement is valid before suubmission 
  } else{
    const theUser = await usersCollection.findOne({username:username});
    return {_id: theUser._id ,name: newUserInfo.name, username:newUserInfo.username}
  }

  };
  
  const checkUser = async (username, password) => {
    // console.log(username)
    // console.log(password)
  
    username = validateInput.checkUsername(username).toLowerCase()
    password = validateInput.checkPassword(password)
  
    // console.log(username,"esbhdvddajbdadbwndb")
  
    const usersCollection = await users()
    const usernameCheck = await usersCollection.findOne({username: username})

    // console.log(usernameCheck)
  
    if(usernameCheck===null){
      // console.log("The Username Is Invalid")
      throw "Either the username or the password is invalid"
      
    }
  
    const passwordCheck = await bcrypt.compare(password,usernameCheck.password)
    


    if(passwordCheck===false){
      // console.log("The Password Is Invalid")
      throw "Either the username or the password is invalid"
    }else{
      let theLoggedInUser = {_id: usernameCheck._id, name: usernameCheck.name, username: usernameCheck.username}
      // return {authenticatedUser: true}
      return theLoggedInUser
    }
  
   };

   const getUserById = async (userId) => {
    const usersCollection = await users()
    const theUser = await usersCollection.findOne({_id:ObjectId(userId)});
    return theUser
   }

   const getUserByUsername = async (theUsername) => {
    const usersCollection = await users()
    const theUser = await usersCollection.findOne({username: theUsername});
    return theUser
   }
  
  module.exports = {createUser, checkUser, getUserById, getUserByUsername};
  
  
  // async function main() {
  //   try {
  //     // console.log(await checkUser("NarmitM9", "Narmit@3456"))
  //   //   const hey = await checkUser("LeoM10", "Messi@3456")
  //   //   const hey = await createUser("Lionel Messi","LionelMessi10", "Messi@3456")
  //   //   console.log(hey)
  //   //   const hey = await getUserById("63d853bdc3f5ef2915ac62e4")
  //   //   console.log(hey)
  //     // console.log(hey.authenticatedUser)
  //     // const heythere = {authenticatedUser: true}
  //     // console.log("this this this", heythere.authenticatedUser)
  //     // if(!hey) "Throw This did not work"
  //     // if(hey.authenticatedUser===true){
  //     //   console.log("This works")
  //     // } else{
  //     //   console.log("It did not work")
  //     // }
  //     // console.log(hey.usernameCheck)
  //     // console.log(hey.authenticatedUser)
  //     process.exit();
      
  //   }catch (e) {
  //     console.log(e);
  //   }
  // }
  
  // main()