import { Router } from 'express';
import { protect } from '../middlewares/auth.middlewares';
import { upload } from '../lib/utils/multer.instance';
// controllers
import { createUser, login } from '../controllers/auth.controllers';
import {
  validIfUserExistsByEmail,
  validIfUserIsVerified,
} from '../middlewares/user.middleware';

const router: Router = Router();

router.post('/', upload.single('profileImgUrl'), createUser);
router.post('/login', validIfUserExistsByEmail, validIfUserIsVerified, login);

// ------- Protected Routes
router.use(protect);

export const authRouter = router;
