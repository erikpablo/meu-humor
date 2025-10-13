import { compare, hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from 'src/repositories/users-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface UpdateProfileUseCaseRequest {
  userId: string
  name: string
  password: string
}

interface UpdateProfileUseCaseResponse {
  user: User
}

export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    password,
  }: UpdateProfileUseCaseRequest): Promise<UpdateProfileUseCaseResponse> {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const passwordHash = await hash(password, 8)

    const user = await this.usersRepository.update(userId, name, passwordHash)

    return {
      user,
    }
  }
}
