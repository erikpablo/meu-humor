import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { UpdateProfileUseCase } from '../update-profile'

export function makeUpdateProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const updateProfileUseCase = new UpdateProfileUseCase(prismaUserRepository)

  return updateProfileUseCase
}
