const { verifyToken } = require("../helpers/jwt");
const { User, Accommodation, SaveAccommodation, Image } = require("../models");

async function auth(req, res, next) {
  const { access_token: accessToken } = req.headers;
  try {
    if (accessToken) {
      const tokenVerified = verifyToken(accessToken);
      const userVerified = await User.findByPk(+tokenVerified.id);

      if (userVerified) {
        req.user = {
          id: tokenVerified.id,
          email: tokenVerified.email,
          role: tokenVerified.role,
        };
        next();
      } else {
        throw { name: "UserNotFound" };
      }
    } else {
      throw { name: "NoToken" };
    }
  } catch (err) {
    next(err);
  }
}

async function authNoAccessCustomer(req, res, next) {
  try {
    if (req.user.role === "owner") {
      next();
    } else {
      throw { name: "UserVerify" };
    }
  } catch (err) {
    next(err);
  }
}

async function authZOwner(req, res, next) {
  const paramsId = +req.params.id;

  try {
    if (req.user.role === "owner") {
      const foundAccommodation = await Accommodation.findByPk(paramsId);
      if (foundAccommodation) {
        if (foundAccommodation.AuthorId === +req.user.id) {
          next();
        } else {
          throw { name: "UserVerify" };
        }
      } else {
        throw { name: "AccommodationNotFound" };
      }
    } else {
      throw { name: "UserVerify" };
    }
  } catch (err) {
    console.log("test");
    next(err);
  }
}

async function authZCustomer(req, res, next) {
  try {
    if (req.user.role === "customer") {
      next();
    } else {
      throw { name: "UserVerify" };
    }
  } catch (err) {
    next(err);
  }
}

async function authZCustomerAcc(req, res, next) {
  const paramsId = +req.params.id;

  try {
    const foundSaved = await SaveAccommodation.findByPk(paramsId);
    if (foundSaved) {
      if (foundSaved.UserId === +req.user.id) {
        next();
      } else {
        throw { name: "UserVerify" };
      }
    } else {
      throw { name: "AccommodationNotFound" };
    }
  } catch (err) {
    next(err);
  }
}

async function authZimage(req, res, next) {
  const imageId = +req.params.imageId;

  try {
    const foundImage = await Image.findByPk(imageId, {
      include: Accommodation,
    });
    if (foundImage) {
      if (foundImage.Accommodation.AuthorId === +req.user.id) {
        next();
      } else {
        throw { name: "UserVerify" };
      }
    } else {
      throw { name: "ImageNotFound" };
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = {
  auth,
  authZOwner,
  authZCustomer,
  authZimage,
  authNoAccessCustomer,
};
