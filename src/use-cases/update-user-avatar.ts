import type { User } from '@prisma/client'
import type { UsersRepository } from 'src/repositories/users-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { AvatarNotSetError } from './error/avatar-not-set-error'

interface UpdateUserAvatarUseCaseRequest {
  userId: string
  avatarUrl: string
}

interface UpdateUserAvatarUseCaseResponse {
  avatarUrl: string
}

export class UpdateUserAvatarUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    avatarUrl,
  }: UpdateUserAvatarUseCaseRequest): Promise<UpdateUserAvatarUseCaseResponse> {
    const userExists = await this.usersRepository.findById(userId)
    if (!userExists) throw new ResourceNotFoundError()

    const user = await this.usersRepository.save(userId, avatarUrl)

    // Garantindo que avatarUrl existe
    if (!user.avatarUrl) {
      throw new AvatarNotSetError()
    }

    return { avatarUrl: user.avatarUrl }
  }
}
