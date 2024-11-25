const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
  },
  {
    timestamps: true,
  }
);

//Compile to form the model
module.exports = mongoose.model("User", userSchema);
