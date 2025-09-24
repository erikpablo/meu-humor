import type { FastifyInstance } from 'fastify'
import { register } from './register'

export async function UsersRoute(app: FastifyInstance) {
  app.post('/users', register)
}
