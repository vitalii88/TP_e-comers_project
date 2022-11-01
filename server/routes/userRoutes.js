import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { authenticateUser } from '../middleware/index.js'


const router = Router();

router.route('/').get(authenticateUser, userController.getAllUsers);

router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.updateUserPassword);
router.route('/showMe').get(userController.showCurrentUser);

router.route('/:id').get(authenticateUser, userController.getSingleUser);

export default router;
