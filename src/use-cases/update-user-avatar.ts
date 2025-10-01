import type { User } from '@prisma/client'
import type { UsersRepository } from 'src/repositories/users-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface UpdateUserAvatarUseCaseRequest {
  userId: string
  avatarUrl: string
}

interface UpdateUserAvatarUseCaseResponse {
  user: User
}

export class UpdateUserAvatarUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    avatarUrl,
  }: UpdateUserAvatarUseCaseRequest): Promise<UpdateUserAvatarUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.save(userId, avatarUrl)

    return {
      user,
    }
  }
}
