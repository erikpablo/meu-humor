import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { upload } from 'src/middleware/multer'

export async function UsersRoute(app: FastifyInstance) {
  app.post('/users', { preHandler: upload.single('avatar') }, register)
}
