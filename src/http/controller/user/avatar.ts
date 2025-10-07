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

  const { filename } = z.object({ filename: z.string() }).parse(fileData)

  // Regex para extrair UUID + extensão (jpg, jpeg, png, webp, gif)
  const match = filename.match(
    /^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}).*\.(jpg|jpeg|png|webp|gif)$/i
  )

  if (!match) {
    return reply.status(400).send({ message: 'Invalid file name format' })
  }

  // Nome final: UUID + extensão
  const finalFilename = `${match[1]}.${match[2].toLowerCase()}`

  const userRepository = new PrismaUsersRepository()
  const avatarUseCase = new UpdateUserAvatarUseCase(userRepository)

  const result = await avatarUseCase.execute({
    userId,
    avatarUrl: finalFilename,
  })

  return reply.status(200).send(result)
}
