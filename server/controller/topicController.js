import { json } from "express";
import mongoose from "mongoose";
import topicModel from "../models/topicModel.js";

const getAllTopics = async (req, res) => {
  try {
    const requestedTopics = await topicModel
      .find({})
      .sort({ date: -1 }) //* Sort the topics by date in descending order
      .populate({
        path: "comments",
        options: { sort: { date: -1 } }, //* Sort the comments by date in descending order
      })
      // .populate("author");
      .populate({ path: "author", select: "userName" });
      

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

//! OTHER COLLECTIONS USE THE FOLLOWING FUNCTION, TOO:
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

export { getAllTopics, getTopicById, postTopic, deleteTopic };
