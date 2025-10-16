import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const registerUseCase = makeGetUserProfileUseCase()

  const { user } = await registerUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined, // Exclude password hash from the response
      email: undefined, // Exclude email from the response
      createdAt: undefined, // Exclude createdAt from the response
    },
  })
}
