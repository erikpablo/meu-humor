import { register } from './register'
import { upload } from 'src/middleware/multer'
import { authenticate } from './authenticate'
import { uploadAvatar } from './avatar'
import { verifyJWT } from 'src/middleware/verify-jwt'
import { logout } from './logout'
import { profile } from './profile'
import { updateProfile } from './update-profile'
import type { FastifyTypeInstance } from 'utils/types'
import { registerSchema } from './schemas/register.schema'
import { authenticateSchema } from './schemas/authenticate.schema'
import { logoutSchema } from './schemas/logout.schema'
import { profileSchema } from './schemas/profile.schema'

export async function UsersRoute(app: FastifyTypeInstance) {
  app.post(
    '/register',
    {
      schema: registerSchema,
    },
    register
  )
  app.post(
    '/sessions',
    {
      schema: authenticateSchema,
    },
    authenticate
  )
  app.post(
    '/update_avatar',
    {
      onRequest: [verifyJWT],
      preHandler: upload.single('avatar'),
    },
    uploadAvatar
  )
  app.post('/logout', { onRequest: [verifyJWT], schema: logoutSchema }, logout)
  app.get('/me', { onRequest: [verifyJWT], schema: profileSchema }, profile)
  app.patch('/profile', { onRequest: [verifyJWT] }, updateProfile)
}
