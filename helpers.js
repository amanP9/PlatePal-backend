//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

//Check String Error Checking
const checkString = (str) => {
    if (str.length === 0) {
      //empty string
      throw "Input Invalid";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Input Invalid";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Input Invalid";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Input Invalid";
    }
    str = str.trim();
  
    return str;
  };
  
  // console.log(checkString("lalala"));
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const checkId = (id) => {
    if (id.length === 0) {
      throw "Input Invalid";
    }
    if (id.trim().length === 0) {
      throw "Input Invalid";
    }
    if (id === null || id === undefined || !id) {
      throw "Input Invalid";
    }
    if (typeof id !== "string" || id?.trim().length <= 0) {
      throw "Input Invalid";
    }
    id = id.trim();
  
    if (!ObjectId.isValid(id)) throw "Invalid Object ID";
  
    return id;
  };
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  const checkIdTwo = (id) => {
  //   if (id.length === 0) {
  //     throw "Input Invalid";
  //   }
  //   if (id.trim().length === 0) {
  //     throw "Input Invalid";
  //   }
  //   if (id === null || id === undefined || !id) {
  //     throw "Input Invalid";
  //   }
  //   if (typeof id !== "string" || id?.trim().length <= 0) {
  //     throw "Input Invalid";
  //   }
  //   id = id.trim();
    
  //   return id;
  // };
  const checkIdTwo = (id) => {
    id = id + "";
    if (id.length === 0) {
      throw "Input Invalid";
    }
    if (id.trim().length === 0) {
      throw "Input Invalid";
    }
    if (id === null || id === undefined || !id) {
      throw "Input Invalid";
    }
    if (typeof id !== "string" || id.trim().length <= 0) {
      throw "Input Invalid";
    }
    id = id.trim();
    
    return id;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //FOR PLOT
  const checkPlot = (str) => {
    if (str.length === 0) {
      //empty string
      throw "Input Invalid";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Input Invalid";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Input Invalid";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Input Invalid";
    }
    str = str.trim();
    return str;
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //FOR MOVIE TITLE
  
  //const stringSize = str.trim().split(/\s+/); //split string
  //count = string.search(/\s/); //Where string is your input, \s is the regex for space characters, and count is the total number found in string.
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkTitle = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
    if (/^[\.a-zA-Z0-9,!?: ]*$/.test(str) === true) {
      if (/^[\.,!?: ]*$/.test(str) === true) {
        throw "Invalid Input Error: Incorrect Input Format";
      }
    } else {
      throw "Invalid Input Error: Incorrect Input Format";
    }
  
    if (str.trim().length < 2) {
      throw "Invalid Input Error: Title too short";
    }
  
    str = str.trim();
  
    const spaceCount = str.includes("  ");
  
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    return str;
  };
  
  // console.log(checkTitle("   The Black Rock 2: Lil Dwayne   "));
  // // console.log(checkTitle(""));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkStudio = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    if (/^[A-Za-z ]*$/.test(str) === false) {
      throw "Invalid Input Error: Incorrect Input Format";
    }
  
    if (str.trim().length < 5) {
      throw "Invalid Input Error: Studio Name too short";
    }
    //
    //
    str = str.trim();
  
    const spaceCount = str.includes("  ");
  
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    return str;
  };
  
  // console.log(checkStudio("Dicaprio"));
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkDirector = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    if (/^[A-Za-z ]*$/.test(str) === false) {
      throw "Invalid Input Error: Only letters allowed";
    }
  
    if (str.trim().length < 5) {
      throw "Invalid Input Error: Studio Name too short";
    }
  
    str = str.trim();
  
    const spaceCount = str.includes("  ");
  
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    let strCountCheck = str.split(" ");
    if (strCountCheck.length > 2) {
      throw "Invalid Input Error: Only First Name and Last Name Allowed";
    }
    for (let i = 0; i < 2; i++) {
      if (strCountCheck[i].length < 3) {
        throw "Invalid Input Error: First Name or Last Name must be at least two characters long ";
      }
    }
  
    return str;
  };
  
  // console.log(checkDirector("   Alex Xu  "));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkRating = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    str = str.trim();
  
    const spaceCount = str.includes("  ");
  
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    const RatingCrossCheck = ["G", "PG", "PG-13", "R", "NC-17"];
    if (RatingCrossCheck.includes(str) === false) {
      throw "Invalid Input";
    }
  
    return str;
  };
  
  // console.log(checkRating("R"));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  //Array Error Checking
  
  // if (array.length == 0) {
  //   //Check for empty array
  //   throw "Error: Array is Empty";
  // }
  // if (typeof array === "undefined") {
  //   //Check if not an array
  //   throw "Error: Input is not an Array";
  // }
  // if (Array.isArray(array) === false) {
  //   //Check if not an array. Arrays are also Objects
  //   throw "Error: Input is not an Array";
  // }
  // for (i in array) {
  //   if (typeof array[i] !== "string")
  //     throw "Error: The elements of an array are not all strings.";
  // }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Array and Strings Nested
  
  const checkSA = (array) => {
    if (array.length == 0) {
      //Check for empty array
      throw "Invalid Input Error: Array is Empty";
    }
    if (typeof array === "undefined") {
      //Check if not an array
      throw "Invalid Input Error: Input is not an Array";
    }
    if (Array.isArray(array) === false) {
      //Check if not an array. Arrays are also Objects
      throw "Invalid Input Error: Input is not an Array";
    }
    for (i in array) {
      if (typeof array[i] !== "string") {
        throw "Invalid Input Error: Not all the elements of the array are strings";
      }
  
      if (array[i].length === 0) {
        //empty string
        throw "Invalid Input Error: Empty String";
      }
      if (array[i].trim().length === 0) {
        //only spaces
        throw "Invalid Input Error: Only Spaces Provided as one of the array element";
      }
      if (array[i] === null || array[i] === undefined || !array[i]) {
        //null or undefined
        throw "Invalid Input Error: Null/Undefined String";
      }
      if (typeof array[i] !== "string" || array[i]?.trim().length <= 0) {
        //not a string or only spaces again
        throw "Invalid Input Error: Not a valid string in the array";
      }
      array[i] = array[i].trim();
    }
    return array;
  };
  
  // console.log(checkSA(["  ", 77]));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Array and Strings Nested
  
  const checkGenres = (array) => {
    if (array.length == 0) {
      //Check for empty array
      throw "Invalid Input Error: Array is Empty";
    }
    if (typeof array === "undefined") {
      //Check if not an array
      throw "Invalid Input Error: Input is not an Array";
    }
    if (Array.isArray(array) === false) {
      //Check if not an array. Arrays are also Objects
      throw "Invalid Input Error: Input is not an Array";
    }
    for (i in array) {
      if (typeof array[i] !== "string") {
        throw "Invalid Input Error: Not all the elements of the array are strings";
      }
  
      if (array[i].length === 0) {
        //empty string
        throw "Invalid Input Error: Empty String";
      }
      if (array[i].trim().length === 0) {
        //only spaces
        throw "Invalid Input Error: Only Spaces Provided as one of the array element";
      }
      if (array[i] === null || array[i] === undefined || !array[i]) {
        //null or undefined
        throw "Invalid Input Error: Null/Undefined String";
      }
      if (typeof array[i] !== "string" || array[i]?.trim().length <= 0) {
        //not a string or only spaces again
        throw "Invalid Input Error: Not a valid string in the array";
      }
  
      array[i] = array[i].trim();
  
      if (/^[A-Za-z -]*$/.test(array[i]) === false) {
        //hyphen for sci-fi
        throw "Invalid Input Error: Only letters allowed";
      }
  
      if (array[i].length < 5) {
        throw "Invalid Genre: Insufficient Length";
      }
    }
    return array;
  };
  
  // console.log(checkGenres(["Romance", "Sci-fi"]));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkCastMembers = (array) => {
    if (array.length == 0) {
      //Check for empty array
      throw "Invalid Input Error: Array is Empty";
    }
    if (typeof array === "undefined") {
      //Check if not an array
      throw "Invalid Input Error: Input is not an Array";
    }
    if (Array.isArray(array) === false) {
      //Check if not an array. Arrays are also Objects
      throw "Invalid Input Error: Input is not an Array";
    }
    for (i in array) {
      if (typeof array[i] !== "string") {
        throw "Invalid Input Error: Not all the elements of the array are strings";
      }
  
      if (array[i].length === 0) {
        //empty string
        throw "Invalid Input Error: Empty String";
      }
      if (array[i].trim().length === 0) {
        //only spaces
        throw "Invalid Input Error: Only Spaces Provided as one of the array element";
      }
      if (array[i] === null || array[i] === undefined || !array[i]) {
        //null or undefined
        throw "Invalid Input Error: Null/Undefined String";
      }
      if (typeof array[i] !== "string" || array[i]?.trim().length <= 0) {
        //not a string or only spaces again
        throw "Invalid Input Error: Not a valid string in the array";
      }
  
      array[i] = array[i].trim();
  
      if (/^[A-Za-z ]*$/.test(array[i]) === false) {
        throw "Invalid Input Error: Only letters allowed";
      }
  
      if (array[i].length < 5) {
        throw "Invalid Genre: Insufficient Length";
      }
      const spaceCount = array[i].includes("  ");
  
      if (spaceCount === true) {
        throw "Invalid Input Error: Two or More Consecutive Spaces";
      }
  
      const strCountCheck = array[i].split(" ");
      if (strCountCheck.length > 2) {
        throw "Invalid Input Error: Only First Name and Last Name Allowed";
      }
  
      for (let j = 0; j < strCountCheck.length; j++) {
        if (strCountCheck[j].length < 3) {
          // console.log(strCountCheck[j]);
          throw "Invalid Input Error: First Name or Last Name must be at least three characters long ";
        }
      }
    }
    return array;
  };
  
  // console.log(checkCastMembers(["Pit Patel", "Scifi"]));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkDate = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    str = str.trim();
  
    const spaceCount = str.includes(" ");
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str) === false) {
      throw "Invalid Input Error: Invalid Date Format";
    }
  
    /* The validation for proper date is inspired from ELIAN EBBING's answer on StackOverflow. 
         I read and understood the code, made a few changes, and implemented it.
         Link: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript */
  
    const dateSeparate = str.split("/");
    const mm = parseInt(dateSeparate[0], 10);
    const dd = parseInt(dateSeparate[1], 10);
    const yyyy = parseInt(dateSeparate[2], 10);
  
    // console.log(mm + "/" + dd + "/" + yyyy);
  
    const today = new Date();
    const year = today.getFullYear();
    // console.log(year);
  
    // Check the ranges of month and year
  
    if (mm == 0 || mm > 12 || dateSeparate[0].length != 2) {
      throw "Invalid Input Error: Month not Valid";
    }
    if (yyyy < 1900 || yyyy > year + 2) {
      throw "Invalid Input Error: Year not Valid";
    }
  
    let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    // Adjust for leap years
    if (yyyy % 400 == 0 || (yyyy % 100 != 0 && yyyy % 4 == 0)) {
      monthLength[1] = 29;
    }
  
    if (
      (dd > 0 && dd <= monthLength[mm - 1]) === false ||
      dateSeparate[1].length != 2
    ) {
      throw "Invalid Input Error: Day not Valid";
    }
  
    return str;
  };
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkRuntime = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    if (/^\d{1,3}\h \d{1,2}min$/.test(str) === false) {
      throw "Invalid Input Error: Invalid Runtime";
    }
  
    let strExtractHours = parseInt(str.split("h ")[0]);
    let strExtractMinutes = parseInt(str.split("h ")[1].split("min")[0]);
  
    if (
      (strExtractHours === 0 && strExtractMinutes === 0) ||
      strExtractHours <= 0
    ) {
      throw "Invalid Input Error: Invalid Runtime";
    }
  
    if (strExtractMinutes >= 60) {
      throw "Invalid Input Error: Minutes cannot be greater than 60";
    }
  
    if (strExtractHours >= 130) {
      throw "Invalid Input Error: Movies are not that long";
    }
  
    const TimeString = `${strExtractHours}h ${strExtractMinutes}min`;
  
    return TimeString;
  };
  
  // console.log(checkRuntime("1h 65min"));
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const checkOverallRating = (n) => {
    if (n === undefined) {
      throw "No Input";
    }
  
    if (/^\d{1}$/.test(n) === false) {
      throw "Invalid Input Error: Invalid Rating";
    }
  
    if (n < 0 || n > 5) {
      //only spaces
      throw "Invalid Input Error: Input Range not valid. Allowed Ranges are 0 to 5";
    }
    if (typeof n !== "number") {
      throw "Invalid Input Error: Input must be a number";
    }
    return n;
  };
  // console.log(checkOverallRating(9));
  
  // console.log(checkDate("01/9/2022"));
  
  const checkReview = (str) => {
    if (str.length === 0) {
      //empty string
      throw "Input Invalid";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Input Invalid";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Input Invalid";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Input Invalid";
    }
    str = str.trim();
    return str;
  };
  
  const checkReviewerName = (str) => {
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Invalid Input Error";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    if (/^[A-Za-z ]*$/.test(str) === false) {
      throw "Invalid Input Error: Only letters allowed";
    }
  
    if (str.trim().length < 5) {
      throw "Invalid Input Error: Reviewer Name too short";
    }
  
    str = str.trim();
  
    const spaceCount = str.includes("  ");
  
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    let strCountCheck = str.split(" ");
    if (strCountCheck.length > 2) {
      throw "Invalid Input Error: Only First Name and Last Name Allowed";
    }
    for (let i = 0; i < 2; i++) {
      if (strCountCheck[i].length < 3) {
        throw "Invalid Input Error: First Name or Last Name must be at least two characters long ";
      }
    }
    return str;
  };
  
  const checkReviewRating = (n) => {
    if (n === undefined) {
      throw "No Input";
    }
  
    if (typeof n !== "number") {
      throw "Invalid Input Error: Input must be a number";
    }
  
    if (/^\d{1}$/.test(n) === false && /^\d{1}.\d{1}$/.test(n) === false) {
      throw "Invalid Input Error: Invalid Rating";
    }
    if (n < 1 || n > 5) {
      throw "Invalid Input Error: Input Range not valid. Allowed Ranges are 1 to 5";
    }
    // if (n % 1 != 0) {
    //   if (n < 1.5 || n > 4.8) {
    //     throw "Invalid Input Error: Input Range not valid (Ratings with decimal point range should be between 1.5 and 4.8)";
    //   }
    // }
  
    return n;
  };
  
  const checkUsername = (username) => {
      if (username.length === 0) {
          //empty string
          throw "Input Invalid";
        }
        if (username.trim().length === 0) {
          //only spaces
          throw "Input Invalid";
        }
        if (username === null || username === undefined || !username) {
          //null or undefined
          throw "Input Invalid";
        }
      
        if (typeof username !== "string" || username?.trim().length <= 0) {
          //not a string or only spaces again
          throw "Input Invalid";
        }
        username = username.trim();
  
        if(username.includes(" ")){
          throw "Username Must Not Include A Space"
        }
      
        if (!/[a-zA-Z]/.test(username)) {
          throw "Username must contain at least one alphabet character";
        }
  
        username = username.toLowerCase()
  
        if (/^[a-zA-Z0-9]*$/.test(username) === false) {
          throw "Invalid Username Error: Please Try Another Username ";
        }
  
        if(username.length < 4){
          throw "Invalid Username Error: Username Too Short"
        }
      
      
        return username;
  };
  const checkPassword = (password) => {
    if (password.length === 0) {
      //empty string
      throw "No Password is Provided";
    }
    if (password.trim().length === 0) {
      //only spaces
      throw "Invalid Password Error: Please Try Another Password";
    }
    if (password === null || password === undefined || !password) {
      //null or undefined
      throw "Invalid Password Error: Please Try Another Password";
    }
  
    if (typeof password !== "string" || password?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Password Error: Please Try Another Password";
    }
  
    if(password.includes(" ")){
      throw "Password Must Not Include A Space"
    }
  
    if(password.length < 6){
      throw "Invalid Password Error: Password Too Short"
    }
  
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*:;"'{}./,><?&]{6,}$/.test(password) === false) {
      throw "Invalid Password Error: Please Try Another Password ";
    }
  
  
  
    return password;
  };
  
  // console.log(checkUsername("AMm123Nn"))
  // console.log(checkPassword("AMAN@2332"))
  //Check about password. One case not handled here
  
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkIngredients = (array) => {
    if(!array){
      throw "Invalid Input Error: Input is empty";
    }

    if (typeof array === "undefined") {
      //Check if not an array
      throw "Invalid Input Error: Input is not an Array";
    }

    if (Array.isArray(array) === false) {
      //Check if not an array. Arrays are also Objects
      throw "Invalid Input Error: Input is not an Array";
    }

    if (array.length == 0) {
      //Check for empty array
      throw "Invalid Input Error: Array is Empty";
    }

    if(array.length < 3){
        throw "Invalid Input Error: At least three ingredients required"
    }

    for (i in array) {
      if (typeof array[i] !== "string") {
        throw "Invalid Input Error: Not all the elements of the array are strings";
      }
  
      if (array[i].length === 0) {
        //empty string
        throw "Invalid Input Error: Empty String";
      }
      if (array[i].trim().length === 0) {
        //only spaces
        throw "Invalid Input Error: Only Spaces Provided as one of the array element";
      }
      if (array[i] === null || array[i] === undefined || !array[i]) {
        //null or undefined
        throw "Invalid Input Error: Null/Undefined String";
      }
      if (typeof array[i] !== "string" || array[i]?.trim().length <= 0) {
        //not a string or only spaces again
        throw "Invalid Input Error: Not a valid string in the array";
      }
  
      array[i] = array[i].trim();
  
    //   if (/^[A-Za-z ]*$/.test(array[i]) === false) {
    //     throw "Invalid Input Error: Only letters allowed";
    //   }

      if (!/[a-zA-Z]/.test(array[i])) {
        throw "Invalid Input Error: At least one alphabet required in each ingredient";
      }
  
      if (array[i].length < 3 || array[i].length > 50) {
        throw "Invalid Ingredients: Length Not Supported";
      }

      const spaceCount = array[i].includes("  ");
      if (spaceCount === true) {
        throw "Invalid Input Error: Two or More Consecutive Spaces";
      }
  

    }
    return array;
  };
//   console.log(checkIngredients(["One whole chicken", "2 cups of flour", "2 eggs", "salt", "pepper", "1 cup cooking oil"]))


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkSteps = (array) => {
 
    if(!array){
      throw "Invalid Input Error: Input is empty";
    }

    if (typeof array === "undefined") {
      //Check if not an array
      throw "Invalid Input Error: Input is not an Array";
    }

    if (Array.isArray(array) === false) {
      //Check if not an array. Arrays are also Objects
      throw "Invalid Input Error: Input is not an Array";
    }
  
    if (array.length == 0) {
      //Check for empty array
      throw "Invalid Input Error: Array is Empty";
    }

    if(array.length < 5){
        throw "Invalid Input Error: At least five steps required"
    }

    for (i in array) {
      if (typeof array[i] !== "string") {
        throw "Invalid Input Error: Not all the elements of the array are strings";
      }
  
      if (array[i].length === 0) {
        //empty string
        throw "Invalid Input Error: Empty String";
      }
      if (array[i].trim().length === 0) {
        //only spaces
        throw "Invalid Input Error: Only Spaces Provided as one of the array element";
      }
      if (array[i] === null || array[i] === undefined || !array[i]) {
        //null or undefined
        throw "Invalid Input Error: Null/Undefined String";
      }
      if (typeof array[i] !== "string" || array[i]?.trim().length <= 0) {
        //not a string or only spaces again
        throw "Invalid Input Error: Not a valid string in the array";
      }
  
      array[i] = array[i].trim();

      if (!/[a-zA-Z]/.test(array[i])) {
        throw "Invalid Input Error: At least one alphabet is required";
      }
  
      if (array[i].length < 20) {
        throw "Invalid Ingredients: Length Not Supported";
      }

      const spaceCount = array[i].includes("  ");
      if (spaceCount === true) {
        throw "Invalid Input Error: Two or More Consecutive Spaces";
      }
  
    }
    return array;
  };

//   console.log(checkSteps(["First take the two eggs and mix them with the flour, the salt and the pepper", "Next, dip the chicken into the mix", "take 1 cup of oil and put in frier", "Fry the chicken on medium heat for 1 hour", "Fry the chicken on medium heat for 1 hour"]))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const checkCookingSkillRequired = (str) => {

    str = str.toLowerCase()
   
    if (!str || str === null) {
      throw "No Input";
    }
  
    if (str.length === 0) {
      //empty string
      throw "Invalid Input Error: Empty String";
    }
    if (str.trim().length === 0) {
      throw "Invalid Input Error: Only Spaces";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Invalid Input Error";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Invalid Input Error";
    }
  
    str = str.trim();
  
    const spaceCount = str.includes("  ");
  
    if (spaceCount === true) {
      throw "Invalid Input Error: Two or More Consecutive Spaces";
    }
  
    const cookingSkillCrossCheck = ["Novice", "Intermediate", "Advanced"];
    const cookingSkillCrossCheck2 = ["novice", "intermediate", "advanced"];
    if (cookingSkillCrossCheck.includes(str) === false && cookingSkillCrossCheck2.includes(str) === false) {
      throw "Invalid Input: Invalid Cooking Skill";
    }
  
    return str;
  };
//   console.log(checkCookingSkillRequired("Advanced"))


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const checkComment = (str) => {
    if (str.length === 0) {
      //empty string
      throw "Input Invalid";
    }
    if (str.trim().length === 0) {
      //only spaces
      throw "Input Invalid";
    }
    if (str === null || str === undefined || !str) {
      //null or undefined
      throw "Input Invalid";
    }
  
    if (typeof str !== "string" || str?.trim().length <= 0) {
      //not a string or only spaces again
      throw "Input Invalid";
    }
    str = str.trim();
  
    return str;
  };
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  module.exports = {
    checkString,
    checkPlot,
    checkTitle,
    checkGenres,
    checkRating,
    checkStudio,
    checkDirector,
    checkCastMembers,
    checkDate,
    checkReview,
    checkRuntime,
    checkOverallRating,
    checkReviewerName,
    checkReviewRating,
    checkId,
    checkIdTwo,
    checkUsername,
    checkPassword,
    checkIngredients,
    checkSteps,
    checkCookingSkillRequired,
    checkComment
  };
  