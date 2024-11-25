const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
//! Connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/fitabit") //!name of the database is FITABIT

  .then(() => console.log("Db connected successfully..."))
  .catch((e) => console.log(e));

//! Middlewares
app.use(express.json()); //pass incoming json data from the user
//Cors
const corsOptions = {
  origin: ["http://localhost:5173"], //!write local website running link, server running on port 8000, port no and actual host no - both are diff things
};
app.use(cors(corsOptions));
//!Routes
app.use("/", router);
//!error handler
app.use(errorHandler);
//! Start the server
const PORT = 8000;
app.listen(PORT, console.log(`Server is up and running on ${PORT}`));

//!in above 3 routes created - register, login , and profile - all work perfectly in postman(web version)
//!in login route - used jwt token -> token able to see in response also correctly

//!VERY VERY IMP POINT FOR PROFILE ROUTER - it will not work in postman unless you pass additional header in it,

//! if not pass it , then it will not work error come that -> AUTHORIZATION TOKEN IS MISSING-> so chatgpt told this
//!steps -
//!Testing in Postman: When making a GET request to /profile, ensure you include the Authorization header:
//!Click on the Headers tab below the URL bar.Add the Authorization Header:
//!In the Key field, type Authorization.
//!In the Value field, type Bearer <your_token>, replacing <your_token> with the actual JWT you received from the login response for each user, it generates diff tokens.
//!example - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

//! FOLLOW ABOVE STEPS -> /profile is working fine.
