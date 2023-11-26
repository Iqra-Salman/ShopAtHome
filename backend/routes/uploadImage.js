import express from "express";
import multer from "multer";
import path from "path";
import authHandler, { adminHandler } from "../middleware/authHandler.js";
const router = express.Router();
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },


  //File naming is based on the original filename appended with a unique suffix (timestamp + random number) to avoid naming collisions.
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const pathExt = path.extname(file.originalname).toLowerCase();
    cb(null, file.fieldname + "-" + uniqueSuffix + pathExt);
    //Multer uses callback functions extensively to handle asynchronous operations. These callbacks are typically in the form of cb(err, result) where:
  },
});
//a suffix refers to an additional set of characters or information appended at the end of a filename.

//The purpose of adding a suffix to a filename, as seen in the code snippet, is to ensure that each uploaded file receives a unique identifier. By appending a unique suffix to the original filename, the resulting filename becomes distinctive, reducing the chances of filename clashes when multiple users upload files with similar names or at the same time.

function fileFilter(req, file, cb) {
  let types = /png|jpg|jpeg/;

  const fileExt = path.extname(file.originalname).toLowerCase();

  const isTypeValid = types.test(fileExt);
  const isMimeValid = types.test(file.mimetype.toLowerCase());

  if (isTypeValid && isMimeValid) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
//The cb function provided by Multer allows you to control the flow of file processing and inform Multer of the outcome of specific operations, such as file storage or filtering, by invoking this callback function.
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post(
  "/productimage",
  authHandler,
  adminHandler,
  upload.single("image"),
  (req, res) => {
    const image = "uploads\\" + req.file.filename;
    res.json({
      imageUrl: image,
    });
  }
);

export default router;
