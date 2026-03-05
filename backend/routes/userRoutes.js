import express from 'express';
const router = express.Router();
import {
    registerUser,
    authUser,
    getUserProfile,
} from '../app/controllers/userController.js';
import { protect } from '../app/middleware/authMiddleware.js';

router.route('/register').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);

export default router;
