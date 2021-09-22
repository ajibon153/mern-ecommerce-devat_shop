const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
  register: async (req, res) => {
    console.log('regist');
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      console.log('email', email);
      if (user) return res.status(400).json({ msg: 'Email already exist.' });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msh: 'Password is at least 6 character long' });
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      console.log('newUser', newUser);
      await newUser.save();
      const accessToken = createAccessToken({
        id: newUser._id,
      });
      console.log('accessToken', accessToken);

      const refreshToken = createRefreshToken({ id: newUser._id });
      console.log('refreshToken', refreshToken);
      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });
      res.json({ accessToken });
    } catch (error) {
      console.log('error', error);
      return res.status(500).json({ msg: error.message });
    }
  },
  loginGet: async (req, res) => {
    try {
      const user = await Users.find();
      console.log('user', user);
      res.json({ success: true, data: user });
    } catch (error) {
      console.log('error', error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Email does not exist' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect Password' });
      const accessToken = createAccessToken({
        id: user._id,
      });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        // maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/user/refresh_token' });
      return res.json({ msg: 'Logged Out' });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.status(400).json({ msg: 'Please Login or Register' });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: 'Please Login or Register' });

        const accesstoken = createAccessToken({ id: user.id });
        console.log('accesstoken', accesstoken);
        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select('-password');
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      res.json(user); // nedded accesstokent
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
