import { MissingDataError } from '@/use-cases/error/missing-data-error'
import { makeMoodTypeUseCase } from '@/use-cases/factories/make-moody-type-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function moodType(request: FastifyRequest, reply: FastifyReply) {
  const moodTypeBodySchema = z.object({
    moodTypeId: z.string(),
    note: z.string().optional(),
  })

  const { moodTypeId, note } = moodTypeBodySchema.parse(request.body)

  try {
    const moodTypeUseCase = makeMoodTypeUseCase()

    await moodTypeUseCase.execute({
      userId: request.user.sub,
      moodTypeId,
      note,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof MissingDataError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
