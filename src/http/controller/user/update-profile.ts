import { makeUpdateProfileUseCase } from '@/use-cases/factories/make-update-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from 'src/use-cases/error/user-already-exists-error'
import { z } from 'zod'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateProfileBodySchema = z.object({
    name: z.string().min(3).max(100),
    password: z.string().min(8).max(50),
  })

  const userId = request.user.sub

  const { name, password } = updateProfileBodySchema.parse(request.body)

  try {
    const updateProfile = makeUpdateProfileUseCase()

    const { user } = await updateProfile.execute({
      userId,
      name,
      password,
    })

    return reply.status(200).send({
      name: user.name,
      password: user.password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
