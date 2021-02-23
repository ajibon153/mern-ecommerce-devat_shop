const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../midleware/auth');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/refresh_token', userCtrl.refreshToken);
router.get('/infor', auth, userCtrl.getUser); //untuk access ini harus kirim header authorize yg di isi accessToken

module.exports = router;
