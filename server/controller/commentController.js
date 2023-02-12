import commentModel from "../models/commentModel.js";

const getAllComments = async (req, res) => {
  try {
    const requestedComments = await commentModel.find({}).populate("author");
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

export { getAllComments };
