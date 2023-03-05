import { json } from "express";
import mongoose from "mongoose";
import topicModel from "../models/topicModel.js";

const getAllTopics = async (req, res) => {
  try {
    const requestedTopics = await topicModel
      .find({})
      .populate("comments")
      // .populate("author");
      .populate({ path: "author", select: "userName" })
      .sort({ date: -1 });

    // .exec();
    res.status(200).json({
      number: requestedTopics.length,
      requestedTopics,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong in the server!",
    });
  }
};

const getTopicById = async (req, res) => {
  if (error) {
    throw error;
  }

  const postId = req.params.topicId;
  try {
    const requestedTopic = await topicModel.findById(postId);
    res.status(200).json({
      msg: "Everything's OK",
      postId: postId,
      requestedTopic,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong in the server!",
    });
  }
};

const postTopic = async (req, res) => {
  const newTopic = new topicModel({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    date: req.body.date,
    tags: req.body.tags,
  });

  try {
    const savedTopic = await newTopic.save();
    res.status(200).json({
      msg: "Saved the new topic!",
      savedTopic,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong while saving the new topic!",
      error: error,
    });
  }
};

// const updateTopic = async (req, res) => {
//   const postId = req.params.topicId;
//   const newCommentId = req.body.newCommentId;
//   const options = { new: true };
//   try {
//     const updatedTopic = await topicModel.updateOne(
//       { _id: postId },
//       { $push: { comments: newCommentId } },
//       options
//     );
//     res.status(200).json({ msg: "Added a new comment!", updatedTopic });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Something went wrong adding new comment!",
//       error: error,
//     });
//   }
// };

const updateTopic = async (req, res) => {
  if (error) {
    throw error;
  }

  const postId = req.params.topicId;
  const newCommentId = req.body.newCommentId; //! WARNING =======Burada yazmak zorunda miyim?

  const options = { new: true }; //! ==========================================?

  try {
    // db.collection("topics").updateOne(
    //   { _id: postId },
    //   { $set: { comments: newCommentId } }
    // );

    const updatedTopic = await topicModel.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: newCommentId } },
      options
    );
    res.status(200).json({ msg: "Added a new comment!", updatedTopic });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong adding new comment!",
      error: error,
    });
  }
};

const deleteTopic = async (req, res) => {
  const postId = req.params.topicId;
  try {
    const topicToDelete = await topicModel.findByIdAndDelete(postId);
    res.status(200).json({
      msg: "Deleted the topic!",
      "topic id": postId,
      topicToDelete,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong with deletion!",
    });
  }
};

export { getAllTopics, getTopicById, updateTopic, postTopic, deleteTopic };
