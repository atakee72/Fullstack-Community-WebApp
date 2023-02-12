import topicModel from "../models/topicModel.js";

const getAllTopics = async (req, res) => {
  try {
    const requestedTopics = await topicModel
      .find({})
      .populate("comments")
      .populate("author");
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

export { getAllTopics };
