import type { User } from '@prisma/client'
import type { UserRepository } from 'src/repositories/users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new Error('E-mail already exists.')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    })

    return {
      user,
    }
  }
}
