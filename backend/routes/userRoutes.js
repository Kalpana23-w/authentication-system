import express from 'express'
import UserController from '../controllers/userController.js';
import passport from 'passport';
import accessTokenAutoRefresh from '../middlewares/accessTokenAutoRefresh.js';
const router = express.Router();

//Public Routes
router.post('/register', UserController.userRegistration);
router.post('/verify-email', UserController.VerifyEmail);
router.post('/login', UserController.userLogin);
router.post('/refresh-token', UserController.getNewAccessToken);
router.post('/password-reset-link', UserController.getPasswprdResetLink);
router.post('/reset-password/:id/:token', UserController.resetPassword);

//protected Routes with accessTokenAutoRefresh middleware
router.get('/me',accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userProfile);
router.post('/logout',accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.userLogout);
router.post('/change-password',accessTokenAutoRefresh, passport.authenticate('jwt', { session: false }), UserController.changePassword);

export default router;