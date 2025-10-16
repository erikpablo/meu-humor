import { compare, hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from 'src/repositories/users-repository'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { OldPasswordDoesNotMatchError } from './error/old-password-does-not-match-error'
import { NewPasswordDoesNotMatchError } from './error/new-password-does-not-match-error'

interface UpdateProfileUseCaseRequest {
  userId: string
  name: string
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

interface UpdateProfileUseCaseResponse {
  user: User
}

export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    oldPassword,
    newPassword,
    confirmNewPassword,
  }: UpdateProfileUseCaseRequest): Promise<UpdateProfileUseCaseResponse> {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new ResourceNotFoundError()
    }

    const oldPasswordDoesMatch = await compare(oldPassword, userExist.password)

    if (!oldPasswordDoesMatch) {
      throw new OldPasswordDoesNotMatchError()
    }

    const newPasswordHash = await hash(newPassword, 8)

    const newPasswordHashIsCorrect = await compare(
      confirmNewPassword,
      newPasswordHash
    )

    if (!newPasswordHashIsCorrect) {
      throw new NewPasswordDoesNotMatchError()
    }

    const user = await this.usersRepository.update(
      userId,
      name,
      newPasswordHash
    )

    return {
      user,
    }
  }
}
