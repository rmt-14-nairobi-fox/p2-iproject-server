module.exports = function (err, req, res, next) {
  let code = err.code || 500;
  let message = 'Internal Server Error';
  console.log(err);

  if (err.name === 'SequelizeUniqueConstraintError') {
    code = 400
    message = `${req.body.email} already registered`
  } else if (err.name === "SequelizeValidationError") {
    let errors = err.errors.map(l => {
      return l.message
    })
    code = 400
    message = errors
  } else if (err.name === 'data not found') {
    code = 404
    message = "Data not found"
  } else if (err.name === 'Unauthorized') {
    code = 401
    message = 'Email/Password is wrong'
  } else if (err.name === "Please Login First") {
    code = 401
    message = "Please Login First"
  } else if (err.name === 'Invalid Token') {
    code = 401
    message = 'Invalid Token'
  } else if (err.name === 'Forbidden') {
    code = 403
    message = 'Forbidden'
  } else if (err.name === 'Only For Customers') {
    code = 403
    message = 'Only For Customers'
  } else if (err.name === "format file image cant be JPEG") {
    code = 415
    message = "Format file image cant be JPEG"
  } else if (err.name === "file size excedeed the maximum size") {
    code = 413
    message = "File size excedeed the maximum size"
  } else if (err.name === "Image is required") {
    code = 400
    message = "Image is required"
  } else if (err.name === "You need to add at least 1 product to your bookmark list") {
    code = 404
    message = "You need to add at least 1 product to your bookmark list"
  } else if (err.name === "There's no data is equal like your filter that you've submited") {
    code = 404
    message = "There's no data is equal like your filter that you've submited"
  }
  res.status(code).json({ message })
}