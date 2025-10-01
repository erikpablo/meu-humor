import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { UpdateUserAvatarUseCase } from 'src/use-cases/update-user-avatar'
import { z } from 'zod'

export async function uploadAvatar(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const fileData = request.file
  const userId = request.user.sub

  const fileSchema = z.object({
    filename: z.string(),
  })

  const { filename } = fileSchema.parse(fileData)

  const userRepository = new PrismaUsersRepository()
  const avatarUseCase = new UpdateUserAvatarUseCase(userRepository)

  const user = await avatarUseCase.execute({
    userId,
    avatarUrl: filename,
  })

  return reply.status(200).send({ user })
}
