import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passport from "passport";
import userRoutes from "./routes/userRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import { jwtStrategy } from "./config/passport.js";

const app = express(); //initialising our app

const port = process.env.PORT || 5000;

const mongoDBConnection = async () => {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to Mongo DB established on port: " + port);
  } catch (error) {
    console.log("Error connecting to MONGODB", error);
  }
};

const loadRoutes = () => {
  // after reaching the api going to the relevant router
  app.use("/api/users", userRoutes);
  app.use("/api/topics", topicRoutes);
  app.use("/api/comments", commentRoutes);
  app.use("/api/recommendations", recommendationRoutes);
  app.use("/api/announcements", announcementRoutes);
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running on " + port + " port"); // OR --> (`...: ${port}`)
    // console.log("something");
  });
};

const addMiddlewares = () => {
  app.use(express.json()); //middleware: express.json
  app.use(
    express.urlencoded({
      //middleware: urlencoded
      extended: true,
    })
  );

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };

  app.use(cors(corsOptions)); //middleware: cors
  cloudinaryConfig();

  app.use(passport.initialize());
  passport.use(jwtStrategy);
};

// *** One can call all in an "envelope" function called "controller". Then one only needs to call the controller.
// const controller = async () => {
//   await mongoDBConnection();
//   addMiddlewares();
//   loadRoutes();
//   startServer();
// };

// controller();

// *** IIFE (Immediate Invoke Function Expressions) - This is the other, more modern way: Schick! (Note that it is "async", because one inside takes an "await".)

(async function controller() {
  await mongoDBConnection();
  addMiddlewares();
  loadRoutes();
  startServer();
})();