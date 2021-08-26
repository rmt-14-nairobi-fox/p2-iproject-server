const FormData = require('form-data');
const imagekit = require('../apis/imagekit');
const getDate = require('../helpers/getDate');

async function uploadImage(req, res, next) {
  try {
    if (req.file) {
      const fileName = 'image_' + getDate();
      const data = new FormData();
      data.append('file', req.file.buffer.toString('base64'));
      data.append('fileName', fileName);

      const response = await imagekit.post('/upload', data, {
        headers: {
          ...data.getHeaders(),
        },
      });

      req.imgUrl = response.data.url;
      next();
    } else {
      next();
    }
  } catch (err) {
    err.endPoint = req.baseUrl;
    next(err);
  }
}

module.exports = uploadImage;
