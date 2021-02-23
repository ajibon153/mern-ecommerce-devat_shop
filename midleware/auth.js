const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return res.status(400).json({ msg: 'Invalid authentification' });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      req.user = user;
      console.log('user', user);
      next();
    });
  } catch (error) {}
};

module.exports = auth;
