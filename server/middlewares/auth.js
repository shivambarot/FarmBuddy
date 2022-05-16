const userService = require('../services/user')
const authService = require('../services/auth')

module.exports = {
  authenticate: (req, res, next) => {
    const authToken = req.headers.authorization;
    if(!authToken) return res.status(401).json({'message': 'Not Authenticated.'})
    let email = authService.verifyJWT(authToken)
    userService.getUserByEmail(email).then(res => {
      if (res.length) {
        req.locals.user = res;
        next()
      } else {
        return res.status(401).json({'message': 'Not Authenticated.'});
      }
    })
  },

  authorizeFarmer: (req, res, next) => {
    const user = req.locals.user;
    if (user.type === 'farmer') next();
    else return res.status(401).json({'message': 'Not Authorized.'});
  },

  authorizeCustomer: (req, res, next) => {
    const user = req.locals.user;
    if (user.type === 'customer') next();
    else return res.status(401).json({'message': 'Not Authorized.'});
  }
};