import announcementModel from "../models/announcementModel.js";

const getAllAnnouncements = async (req, res) => {
  try {
    const requestedAnnouncements = await announcementModel
      .find({})
      .populate("comments")
      // .populate("author");
      .populate({ path: "author", select: "userName" })
      .sort({ date: -1 });
    // .exec();
    res.status(200).json({
      number: requestedAnnouncements.length,
      requestedAnnouncements,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong in the server retrieving announcements!",
    });
  }
};

export { getAllAnnouncements };
