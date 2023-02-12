import userModel from "../models/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel
      .find({})
      .populate("topics")
      .populate("comments")
      .exec();
    console.log("allusers >>>", allUsers);
    res.status(201).json({
      //just to see how it goes with customising, 200 -> 201
      NumberOfUsers: allUsers.length,
      allUsers,
    });
  } catch (error) {
    res.status(500).json({
      error,
      Message: "Something went wrong in the server!",
    });
  }
};

const getUsersByRoleBadge = async (req, res) => {
  console.log("req >>>", req.roleBadge);
  const { roleBadge } = req.params;
  const { userName } = req.query;

  if (userName) {
    try {
      const requestedUsers = await userModel.find({
        roleBadge: roleBadge,
        userName: userName,
      });
      if (requestedUsers.length === 0) {
        res.status(201).json({
          msg: "Your request brings no result. Please check, revise and try once again!",
        });
      } else {
        res.status(200).json({
          number: requestedUsers.length,
          requestedUsers,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong in the server!",
      });
    }
  } else {
    try {
      const requestedUsers = await userModel
        .find({
          roleBadge: req.params.roleBadge, //second methode to formulate it
        })
        .exec();
      if (requestedUsers.length === 0) {
        res.status(200).json({
          msg: "No such badge exists in our app.",
        });
      } else {
        res.status(200).json({
          number: requestedUsers.length,
          requestedUsers,
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Something went wrong in the server!",
      });
    }
  }
};

export { getAllUsers, getUsersByRoleBadge };
