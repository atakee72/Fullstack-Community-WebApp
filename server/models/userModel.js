import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  firstname: {
    type: String,
  },

  surname: {
    type: String,
  },

  birthdate: {
    type: Number,
    hidden: Boolean,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  roleBadge: {
    type: String,
  },

  hobbies: [{ type: String }],

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],

  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "topic" }],

  likes: { type: Number },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
