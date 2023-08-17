import { Router } from 'express';
import { protect } from '../middlewares/auth.middlewares';
import { upload } from '../lib/utils/multer.instance';
// controllers
import { getAllUsers } from '../controllers/user.controllers';

const router: Router = Router();

router.get('/', getAllUsers)

// ------- Protected Routes
router.use(protect);

export const userRouter = router;