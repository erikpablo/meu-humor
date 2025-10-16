import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middleware/verify-jwt'
import { moodEntry } from './mood-Entry'

export async function moodRoutes(app: FastifyInstance) {
  app.post('/mood', { onRequest: [verifyJWT] }, moodEntry)
}
