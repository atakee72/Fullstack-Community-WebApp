import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
  body: {
    type: String,
  },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  date: {
    type: Number,
  },

  upvotes: { type: Number },
});

const commentModel = mongoose.model("comment", commentsSchema);

export default commentModel;
