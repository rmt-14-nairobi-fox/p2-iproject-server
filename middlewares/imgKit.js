const axios = require("axios");
const FormData = require("form-data");
const { Accommodation } = require("../models/");

async function imgKitCreate(req, res, next) {
  if (!req.file) {
    try {
      throw { name: "NoImage" };
    } catch (err) {
      next(err);
    }
  } else {
    const typeFile = `.${
      req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ]
    }`;
    try {
      //   console.log(req.file);
      if (typeFile === ".jpg" || typeFile === ".png" || typeFile === ".jpeg") {
        if (req.file.size < 255000) {
          let encodePrivateKey = Buffer.from(
            `${process.env.IMGKIT_PRIVATE_KEY}:`,
            "utf-8"
          ).toString("base64");

          let imgBufferEncoded = req.file.buffer.toString("base64");

          let formData = new FormData();
          formData.append("file", imgBufferEncoded);
          formData.append("fileName", req.file.originalname);

          axios
            .post("https://upload.imagekit.io/api/v1/files/upload", formData, {
              headers: {
                ...formData.getHeaders(),
                Authorization: `Basic ${encodePrivateKey}`,
              },
            })
            .then((data) => {
              req.body.imageUrl = data.data.url;
              next();
            })
            .catch((err) => {
              next(err);
            });
        } else {
          throw { name: "FileIsBig" };
        }
      } else {
        throw { name: "WrongTypeFile" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { imgKitCreate };
