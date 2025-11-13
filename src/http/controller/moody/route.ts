import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/middleware/verify-jwt'
import { moodEntry } from './mood-entry'
import { MoodSchema } from './schemas/mood.schema'
import { moodAverage } from './mood-average'
import { MoodsSchema } from './schemas/get-mood.schema'

export async function moodRoutes(app: FastifyInstance) {
  app.post('/mood', { onRequest: [verifyJWT], schema: MoodSchema }, moodEntry)
  app.get(
    '/moods',
    { onRequest: [verifyJWT], schema: MoodsSchema },
    moodAverage
  )
}
