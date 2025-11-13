import { FastifyReply, FastifyRequest } from 'fastify'
import { querySchema } from './schemas/get-mood.schema'
import { MakeGetMoodsUseCase } from '@/use-cases/factories/make-get-moods-use-case'

export async function moodAverage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { start_date, end_date, limit, order } = querySchema.parse(
    request.query
  )

  const moodAverageUseCase = MakeGetMoodsUseCase()
  const response = await moodAverageUseCase.execute({
    userId: request.user.sub,
    startDate: start_date,
    endDate: end_date,
    order,
    limit: limit ? Number(limit) : undefined,
  })

  return reply.status(200).send(response)
}
