import { makeMoodTypeUseCase } from '@/use-cases/factories/make-moody-entry-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { moodEntryBodySchema } from './schemas/mood.schema'
import { MaxNumberOfMoodTypeError } from '@/use-cases/error/max-number-of-mood-type-error'

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
    if (err instanceof MaxNumberOfMoodTypeError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
