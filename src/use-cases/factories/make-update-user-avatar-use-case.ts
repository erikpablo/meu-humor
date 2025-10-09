import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { UpdateUserAvatarUseCase } from '../update-user-avatar'

export function makeUpdateAvatarUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const updateAvatarUseCase = new UpdateUserAvatarUseCase(prismaUserRepository)

  return updateAvatarUseCase
}
