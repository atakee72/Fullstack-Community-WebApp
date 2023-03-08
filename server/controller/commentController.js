import commentModel from "../models/commentModel.js";
import topicModel from "../models/topicModel.js";
import mongoose from "mongoose";
import generateToken from "../utils/jwt.js";

const getAllComments = async (req, res) => {
  try {
    const requestedComments = await commentModel
      .find({})
      // .populate("author");
      .populate({ path: "author", select: "userName userPicture" })
      .sort({ date: -1 });
    // .populate("collectionItem");

    res.status(200).json({
      number: requestedComments.length,
      requestedComments,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong in the server!",
    });
  }
};


const postComment = async (req, res) => {
  const newComment = new commentModel({
    _id: new mongoose.Types.ObjectId(),
    body: req.body.body,
    author: req.body.author,
    date: req.body.date,
    upvotes: req.body.upvotes,
    relevantPostId: req.body.relevantPostId,
  });

  try {
    const savedComment = await newComment.save();
    if (savedComment) {
      try {
        const updatedTopic = await topicModel.findByIdAndUpdate(
          { _id: req.body.relevantPostId },
          { $push: { comments: savedComment._id } },
          { new: true }
        );
        res.status(201).json({
          msg: "Added a new comment to the post!",
          updatedTopic: updatedTopic,
        });
      } catch (error) {
        res.status(500).json({
          msg: "Error updating topic",
        });
      }
    } else {
      res.status(500).json({
        msg: "Ah, something went wrong while saving the new comment!",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ah, something went wrong while saving the new comment!",
      error: error,
    });
  }
};


const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const commentToDelete = await commentModel.findByIdAndDelete(commentId);
    res.status(200).json({
      msg: "Deleted the comment!",
      "Comment id": commentId,
      commentToDelete,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong with deletion!",
    });
  }
};

export { getAllComments, postComment, deleteComment };
