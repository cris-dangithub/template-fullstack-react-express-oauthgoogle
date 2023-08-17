import { Router } from 'express';
import { loginWithGoogle } from '../controllers/google.controller';
import { protectGoogleToken } from '../middlewares/google.middlewares';
import {
  validIfUserExistsByEmail,
  validIfUserIsVerified,
} from '../middlewares/user.middleware';

const router = Router();

// ------- Protected google Routes
router.use(protectGoogleToken);
/**
 * Ruta para iniciar sesión con una cuenta de Google.
 */
router.post(
  '/',
  validIfUserExistsByEmail,
  validIfUserIsVerified,
  loginWithGoogle
);

export const googleRouter = router;
