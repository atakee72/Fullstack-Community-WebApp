import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { encryptPassword, verifyPassword } from "../utils/passEncryp.js";
import generateToken from "../utils/jwt.js";

const imageUpload = async (req, res) => {
  console.log("🚀 ~ ~ req.file", req.file);

  try {
    console.log("something");
    const pictureUpload = await cloudinary.uploader.upload(req.file.path, {
      folder: "communityWebApp",
    });
    console.log("🚀 ~  ~ pictureUpload>>>>>>>>>", pictureUpload);

    res.status(200).json({
      msg: "Hurray, the image has been successfully uploaded!",
      userPicture: pictureUpload.url,
    });
  } catch (error) {
    res.status(500).json({
      errorMsg: "Sorry, something went wrong with the upload!",
    });
  }
};

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

const signup = async (req, res) => {
  console.log("req.body", req.body);
  // to use the destructured variables:
  // const { userName, eMail, passWord, userPicture } = req.body;

  try {
    const existingUser = await userModel.findOne({ eMail: req.body.email });
    console.log("🚀 existingUser", existingUser);

    if (existingUser) {
      res.status(409).json({
        msg: "This email is already in use! You might have an account.",
      });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);
      console.log("🚀 hashedPassword", hashedPassword);

      // VALIDATE EMAIL AND PASSW. BEFORE SAVING USER express validator --

      const newUser = new userModel({
        //destructured variables above can be then used here
        userName: req.body.username,
        eMail: req.body.email,
        passWord: hashedPassword,
        userPicture: req.body.userPicture,
        // user roles can be here introduced.. e.g. isAdmin: true/false or admin: yes/no
      });

      try {
        const savedUser = await newUser.save();
        console.log("🚀 savedUser", savedUser);
        res.status(201).json({
          msg: "Signup successful!",
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
  const { id } = req.params;
  console.log("🚀 ~ updateUser ~ req.params:", req.params);

  const { firstName, surName, birthDay, roleBadge, hobbies } = req.body;
  console.log("🚀 ~ updateUser ~ req.body:", req.body);
  const birthDayInMillis = new Date(birthDay).getMilliseconds();
  console.log("🚀 ~ updateUser ~ birthDayInMillis:", birthDayInMillis);

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          firstName,
          surName,
          birthDay: birthDayInMillis,
          roleBadge,
          hobbies,
        },
      },
      { new: true }
    );
    const response = {
      message: "User updated successfully",
      data: updatedUser,
    };

    res.status(200).json(response);
  } catch (error) {
    const response = {
      message: "An error occurred while updating the user",
      error: error.message,
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
