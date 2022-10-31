import { Router } from 'express';
import { userController } from '../controllers/index.js';


const router = Router();

router.route('/').get(userController.getAllUsers);

router.route('/updateUser').patch(userController.updateUser);
router.route('/updateUserPassword').patch(userController.updateUserPassword);

router.route('/:id').get(userController.getSingleUser);
router.route('/showMe').get(userController.showCurrentUser);

export default router;
