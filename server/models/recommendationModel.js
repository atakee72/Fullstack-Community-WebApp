import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  body: {
    type: String,
  },

  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

  date: {
    type: Number,
  },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],

  views: { type: Number },

  tags: [{ type: String }],
});

const recommendationModel = mongoose.model(
  "recommendation",
  recommendationSchema
);

export default recommendationModel;
