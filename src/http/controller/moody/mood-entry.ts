import { MissingDataError } from '@/use-cases/error/missing-data-error'
import { makeMoodTypeUseCase } from '@/use-cases/factories/make-moody-entry-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { moodEntryBodySchema } from './schemas/mood.schema'

export async function moodEntry(request: FastifyRequest, reply: FastifyReply) {
  const { moodTypeId, note } = moodEntryBodySchema.parse(request.body)

  try {
    const moodEntryUseCase = makeMoodTypeUseCase()

    await moodEntryUseCase.execute({
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
