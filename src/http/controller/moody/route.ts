import { FastifyInstance } from 'fastify'
import { moodType } from './mood-type'
import { verifyJWT } from '@/middleware/verify-jwt'

export async function moodRoutes(app: FastifyInstance) {
  app.post('/mood', { onRequest: [verifyJWT] }, moodType)
}
