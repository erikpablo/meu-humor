import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const registerUseCase = makeGetUserProfileUseCase()

  const { user } = await registerUseCase.execute({
    userId: request.user.sub,
  })

  const { password, email, createdAt, ...safeUser } = user

  return reply.status(200).send({
    user: safeUser,
  })
}
