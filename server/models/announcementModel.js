import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
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

const announcementModel = mongoose.model("announcement", announcementSchema);

export default announcementModel;
