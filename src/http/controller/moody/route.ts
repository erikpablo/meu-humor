import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middleware/verify-jwt'
import { moodEntry } from './mood-entry'
import { profileSchema } from './schemas/mood.schema'
import { moodAverage } from './mood-average'

export async function moodRoutes(app: FastifyInstance) {
  app.post(
    '/mood',
    { onRequest: [verifyJWT], schema: profileSchema },
    moodEntry
  )
  app.get('/moods', { onRequest: [verifyJWT] }, moodAverage)
}
