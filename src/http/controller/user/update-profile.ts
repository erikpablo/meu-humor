import { NewPasswordDoesNotMatchError } from '@/use-cases/error/new-password-does-not-match-error'
import { OldPasswordDoesNotMatchError } from '@/use-cases/error/old-password-does-not-match-error'
import { makeUpdateProfileUseCase } from '@/use-cases/factories/make-update-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const updateProfileBodySchema = z.object({
    name: z.string().min(3).max(100),
    oldPassword: z.string().min(8).max(50),
    newPassword: z.string().min(8).max(50),
    confirmNewPassword: z.string().min(8).max(50),
  })

  const userId = request.user.sub

  const { name, oldPassword, newPassword, confirmNewPassword } =
    updateProfileBodySchema.parse(request.body)

  try {
    const updateProfile = makeUpdateProfileUseCase()

    await updateProfile.execute({
      userId,
      name,
      oldPassword,
      newPassword,
      confirmNewPassword,
    })

    return reply.status(204).send({})
  } catch (err) {
    if (err instanceof OldPasswordDoesNotMatchError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof NewPasswordDoesNotMatchError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
