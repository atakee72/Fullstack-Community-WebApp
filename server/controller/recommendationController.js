import recommendationModel from "../models/recommendationModel.js";

const getAllRecommendations = async (req, res) => {
  try {
    const requestedRecommendations = await recommendationModel
      .find({})
      .populate("comments")
      .populate("author");
    // .exec();
    res.status(200).json({
      number: requestedRecommendations.length,
      requestedRecommendations,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong in the server retrieving recommendations!",
    });
  }
};

export { getAllRecommendations };
