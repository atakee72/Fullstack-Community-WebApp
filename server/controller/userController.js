import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword, verifyPassword } from "../utils/passEncryp.js";
import generateToken from "../utils/jwt.js";
import { body, validationResult } from "express-validator";

const imageUpload = async (req, res) => {
  console.log("🚀 ~ ~ req.file", req.file);

  try {
    const pictureUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "communityWebApp",
    });
    console.log("🚀 ~  ~ pictureUpload>>>>>>>>>", pictureUpload);

    if (pictureUpload) {
      const newPicture = pictureUpload.secure_url;

      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          { _id: req.body.userId },
          { $set: { userPicture: newPicture } },
          { new: true }
        );
        res.status(201).json({
          msg: "Hurray, replaced the profile picture with a new one!",
          newPicture: newPicture,
          updatedUser: updatedUser,
        });
      } catch (error) {
        res.status(500).json({
          msg: "Error replacing the profile picture",
        });
      }
    } else {
      res.status(500).json({
        msg: "Ah, something went wrong while uploading and/or replacing the profile picture!",
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMsg:
        "So sorry, something went wrong with the updating/replacing the user picture!",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel
      .find({})
      .populate("topics")
      .populate("announcements")
      .populate("recommendations")
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

// const { validationResult } = require("express-validator");

const validateEmailAndPassword = [
  body("username").isLength({ min: 5 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
];

const signup = async (req, res) => {
  console.log("req.body", req.body);
  // to use the destructured variables:
  // const { userName, eMail, passWord, userPicture } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await userModel.findOne({ eMail: req.body.email });
    console.log("🚀 existingUser", existingUser);

    if (existingUser) {
      res.status(409).json({
        msg: "This email is already in use! You might have an account.",
      });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);
      console.log("🚀 hashedPassword", hashedPassword);

      const newUser = new userModel({
        userName: req.body.username,
        eMail: req.body.email,
        passWord: hashedPassword,
        userPicture: req.body.userPicture,
      });

      try {
        const savedUser = await newUser.save();
        console.log("🚀 savedUser", savedUser);
        res.status(201).json({
          msg: "Signup successful! You can now login.",
          user: {
            userName: savedUser.userName,
            eMail: savedUser.eMail,
            userPicture: savedUser.userPicture,
          },
        });
      } catch (error) {
        res.status(500).json({ msg: "An error occured during singup!" });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "A general error occured!",
      error: error,
    });
  }
};

const login = async (req, res) => {
  console.log("🚀 ~ userController.js:151 ~ req.body", req.body);
  try {
    const existingUser = await userModel.findOne({ eMail: req.body.email });
    if (!existingUser) {
      res.status(401).json({
        msg: "No user with this email address!",
      });
    } else {
      // verify password
      const isPasswordMatching = await verifyPassword(
        req.body.password,
        existingUser.passWord
      );
      if (!isPasswordMatching) {
        res.status(401).json({
          msg: "Wrong password!",
        });
      } else {
        // email exists, password correct..

        const token = generateToken(existingUser._id);

        res.status(200).json({
          msg: "You're logged in!",
          user: {
            id: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.eMail,
            picture: existingUser.userPicture,
          },
          userToken: token,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong with the login!",
    });
  }
};

const getProfile = async (req, res) => {
  console.log("req.user: >>>>>>> ", req.user);

  try {
    res.status(200).json({
      msg: "User profile has been called successfully!",
      userId: req.user._id,
      userName: req.user.userName,
      firstName: req.user.firstName,
      surName: req.user.surName,
      birthDay: req.user.birthDay,
      eMail: req.user.eMail,
      userPicture: req.user.userPicture,
      roleBadge: req.user.roleBadge,
      hobbies: req.user.hobbies,
      topics: req.user.topics,
      comments: req.user.comments,
      likes: req.user.likes,
    });

    console.log(
      "res: once as an object and once as an array :) >>>>>>>>>>>>>>>",
      {
        userName: res.req.user.userName,
        userId: res.req.user._id,
      },
      [res.req.user.userName, res.req.user._id]
    );
  } catch (error) {
    console.log(
      "🚀 ~ Something weird happened here getting the user profile",
      error
    );
    res.status(500).json({
      msg: "Something weird happened here getting the user profile",
    });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { firstname, surname, birthday, rolebadge, hobbies } = req.body;
  // const birthDayInMillis = new Date(birthday).getMilliseconds();
  //   const birthDayInMillis = new Date(birthday).getTime();

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName: firstname,
          surName: surname,
          birthDay: birthday,
          roleBadge: rolebadge,
          hobbies: hobbies,
        },
      },
      { new: true }
    );
    const response = {
      msg: "User updated successfully",
      data: updatedUser,
    };

    res.status(200).json(response);
  } catch (error) {
    const response = {
      msg: "An error occurred while updating the user",
      error: error,
    };

    res.status(500).json(response);
  }
};

export {
  imageUpload,
  getAllUsers,
  getUsersByRoleBadge,
  signup,
  login,
  getProfile,
  updateUser,
};
