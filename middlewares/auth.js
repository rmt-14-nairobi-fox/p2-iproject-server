//!Auth
// const authentication = async (req, res, next) => {
//   try {
//     if(!req.headers.access_token) throw { code: 401, name: 'InvalidToken' }

//     const {access_token: accessToken} = req.headers;
//     const payload = authToken(accessToken);

//     const isUser = await User.findByPk(payload.id)
//     if(!isUser) throw { code: 401, name: 'Unauthorized' }

//     req.user = {
//       id: payload.id,
//       username: payload.username,
//       email: payload.email,
//       profilePict: payload.profilePict
//     }
//     next();
//   } catch(err) {
//     next(err);
//   }
// }
