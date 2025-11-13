import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetTodayMoodUseCase } from '@/use-cases/factories/make-get-today-mood-use-case'

export async function moodToday(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub

  const moodTodayUseCase = makeGetTodayMoodUseCase()
  const moodType = await moodTodayUseCase.execute({ userId })

  return reply.status(200).send({ moodType })
}
