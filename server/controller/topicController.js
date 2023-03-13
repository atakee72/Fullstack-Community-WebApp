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
        populate: { path: "author", select: "userName userPicture" },
      })
      // .populate("author");
      .populate({ path: "author", select: "userName userPicture" });
      

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
    likes: req.body.likes,
    views: req.body.views,
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

const updateLikes = async (req, res) => {
  const { topicId } = req.params;
  const { userId } = req.body;

  try {
    const topic = await topicModel.findById(topicId);

    // Check if the current user has already liked the topic
    if (topic.likedBy.includes(userId)) {
      const response = {
        msg: "The user has already liked this topic",
        totalLikesNow: topic.likes,
      };
      return res.status(400).json(response);
    }

    const updatedLikeCounter = await topicModel.findOneAndUpdate(
      { _id: topicId },
      {
        $inc: {
          likes: 1,
        },
        $push: {
          likedBy: userId,
        },
      },
      { new: true }
    );

    const response = {
      msg: "Like counter updated successfully",
      totalLikesNow: updatedLikeCounter,
    };

    res.status(200).json(response);
  } catch (error) {
    const response = {
      msg: "An error occurred while updating the like counter",
      error: error,
    };

    res.status(500).json(response);
  }
};

export { getAllTopics, getTopicById, postTopic, deleteTopic, updateLikes };
