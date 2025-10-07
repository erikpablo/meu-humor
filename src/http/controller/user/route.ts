import { FastifyInstance } from 'fastify'
import { register } from './register'
import { upload } from 'src/middleware/multer'
import { authenticate } from './authenticate'
import { uploadAvatar } from './avatar'
import { verifyJWT } from 'src/middleware/verify-jwt'
import { logout } from './logout'
import { profile } from './profile'

export async function UsersRoute(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', authenticate)
  app.post(
    '/update_avatar',
    { preHandler: upload.single('avatar'), onRequest: [verifyJWT] },
    uploadAvatar
  )
  app.post('/logout', { onRequest: [verifyJWT] }, logout)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
