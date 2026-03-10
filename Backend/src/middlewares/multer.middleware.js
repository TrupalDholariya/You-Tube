import multer from "multer";
import path from "path";
import os from "os";
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./Public/Temp");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination: os.tmpdir(),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });
