import commentModel from "../models/commentModel.js";
import topicModel from "../models/topicModel.js";
import generateToken from "../utils/jwt.js";

const getAllComments = async (req, res) => {
  try {
    const requestedComments = await commentModel
      .find({})
      // .populate("author");
      .populate({ path: "author", select: "userName" })
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
  console.log("🚀 ~ postComment ~ req.body:", req.body);
  const { collectionItem } = req.body;
  const newComment = new commentModel({
    body: req.body.body,
    userName: req.body.username,
    date: req.body.date,
    upvotes: req.body.upvotes,
    collectionItem: req.body.collectionItem,
  });
  console.log("🚀 ~ postComment ~ newComment:", newComment);

  try {
    const savedComment = await newComment.save();
    console.log("🚀 ~ postComment ~ savedComment:", savedComment);

    // Update the forum post with the comment ID
    if (savedComment) {
      try {
        const updatedTopic = await topicModel.findByIdAndUpdate(
          { _id: "63e54bb0fab9b3673bf1941e" },
          { $push: { comments: savedComment._id } },
          { new: true }
        );
        console.log("updatedTopic", updatedTopic);
        res.status(201).json({
          msg: "Comment saved and added to the relevant post!",
          "New comment": {
            body: savedComment.body,
            userName: savedComment.loggedUser,
            date: savedComment.date,
            upvotes: savedComment.upvotes,
            collectionItem: savedComment.collectionItem,
          },
          updatedPost: updatedTopic,
        });
      } catch (error) {
        console.log("error updating topic", error);
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ah, an error occured during saving the comment!",
      error: error,
    });
  }
};

export { getAllComments, postComment };
