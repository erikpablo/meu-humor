import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { upload } from 'src/middleware/multer'
import { authenticate } from './authenticate'
import { uploadAvatar } from './avatar'
import { verifyJWT } from 'src/middleware/verify-jwt'

export async function UsersRoute(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', authenticate)
  app.patch(
    '/update_avatar',
    { preHandler: upload.single('avatar'), onRequest: [verifyJWT] },
    uploadAvatar
  )
}
