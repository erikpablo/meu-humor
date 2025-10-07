import { FastifyReply, FastifyRequest } from 'fastify'
import { create } from 'node:domain'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from 'src/use-cases/get-user-profile'
import { RegisterUseCase } from 'src/use-cases/register'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new GetUserProfileUseCase(prismaUsersRepository)

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
