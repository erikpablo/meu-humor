import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetTodayMoodUseCase } from '@/use-cases/factories/make-get-today-mood-use-case'

export async function moodToday(request: FastifyRequest, reply: FastifyReply) {
  const moodTodayUseCase = makeGetTodayMoodUseCase()
  const moodType = await moodTodayUseCase.execute({ userId: request.user.sub })

  return reply.status(200).send({ moodType })
}
