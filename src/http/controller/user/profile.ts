import { FastifyReply, FastifyRequest } from 'fastify'
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

  return reply.status(201).send({
    avatarUrl: user.avatarUrl,
    name: user.name,
    password: user.password,
  })
}
