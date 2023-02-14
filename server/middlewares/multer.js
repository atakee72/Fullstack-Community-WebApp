import multer from "multer";
import path from "path";

const multerUpload = multer({
  storage: multer.diskStorage({}),
  //left empty, multer takes care of it...

  fileFilter: function fileFilter(req, file, cb) {
    let extension = path.extname(file.originalname);

    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      // The function should call `cb` with a boolean
      // to indicate if the file should be accepted
      // You can always pass an error if something goes wrong:

      cb(new Error("This file format is not allowed as a picture!"), false);
    }

    // To accept the file pass `true`, like so ("null" part is for error, if no, leave empty):
    cb(null, true);
  },
});

export { multerUpload };
