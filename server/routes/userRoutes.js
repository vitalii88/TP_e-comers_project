import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { authenticateMiddleware } from '../middleware/index.js'


const router = Router();

router.route('/')
  .get(authenticateMiddleware.authenticateUser, authenticateMiddleware.authorizePermission('admin'), userController.getAllUsers);

router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.updateUserPassword);
router.route('/showMe').get(userController.showCurrentUser);

router.route('/:id')
  .get(authenticateMiddleware.authenticateUser, authenticateMiddleware.authorizePermission('admin'), userController.getSingleUser);

export default router;
